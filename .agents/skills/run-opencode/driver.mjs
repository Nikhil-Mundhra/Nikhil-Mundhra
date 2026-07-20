#!/usr/bin/env node

/**
 * OpenCode CLI Driver
 *
 * A helper script for common OpenCode workflows.
 * This driver provides convenient functions for running OpenCode
 * with various input sources and common patterns.
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const OPENCODE_CMD = 'opencode';

/**
 * Run OpenCode with a direct prompt
 * @param {string} prompt - The prompt to send to OpenCode
 * @param {object} options - Additional options
 * @returns {Promise<string>} OpenCode output
 */
export async function runPrompt(prompt, options = {}) {
  const args = ['run', prompt];

  if (options.model) {
    args.unshift('--model', options.model);
  }

  if (options.continue) {
    args.unshift('--continue');
  }

  if (options.session) {
    args.unshift('--session', options.session);
  }

  return spawnOpenCode(args);
}

/**
 * Run OpenCode with file context
 * @param {string} prompt - The prompt to send
 * @param {string|string[]} files - File path(s) to include
 * @param {object} options - Additional options
 * @returns {Promise<string>} OpenCode output
 */
export function runWithFiles(prompt, files, options = {}) {
  const fileList = Array.isArray(files) ? files : [files];
  const fileArgs = fileList.flatMap(f => ['--file', f]);
  const args = ['run', ...fileArgs, prompt];

  return spawnOpenCode(args);
}

/**
 * Run OpenCode with piped input
 * @param {string} input - Input content to pipe
 * @param {string} prompt - The prompt to send
 * @param {object} options - Additional options
 * @returns {Promise<string>} OpenCode output
 */
export function runWithPipedInput(input, prompt, options = {}) {
  return new Promise((resolve, reject) => {
    const args = ['run', prompt];
    const child = spawn(OPENCODE_CMD, args);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`OpenCode exited with code ${code}: ${stderr}`));
      }
    });

    // Write input to stdin
    child.stdin.write(input);
    child.stdin.end();
  });
}

/**
 * Generate a git commit message from diff
 * @param {object} options - Options
 * @returns {Promise<string>} Generated commit message
 */
export async function generateCommitMessage(options = {}) {
  const diff = await spawnCommand('git', ['diff', '--cached']);

  if (!diff.trim()) {
    throw new Error('No staged changes found. Stage changes first with `git add`.');
  }

  return runWithPipedInput(
    diff,
    'Generate a clear, professional git commit message based on these changes',
    options
  );
}

/**
 * Analyze test failures
 * @param {string} testCommand - The test command to run
 * @param {object} options - Options
 * @returns {Promise<string>} Analysis of test failures
 */
export async function analyzeTestFailures(testCommand = 'npm test', options = {}) {
  try {
    const testOutput = await spawnCommand('sh', ['-c', testCommand]);
    return runWithPipedInput(
      testOutput,
      'Analyze these test failures and suggest fixes',
      options
    );
  } catch (error) {
    // If tests fail, parse the output and send to OpenCode
    return runWithPipedInput(
      error.stdout || error.message,
      'Analyze these test failures and suggest fixes',
      options
    );
  }
}

/**
 * Review code changes
 * @param {string} ref - Git reference (default: 'HEAD~1')
 * @param {object} options - Options
 * @returns {Promise<string>} Code review output
 */
export async function reviewChanges(ref = 'HEAD~1', options = {}) {
  const diff = await spawnCommand('git', ['diff', ref]);

  return runWithPipedInput(
    diff,
    'Review this diff for potential bugs, security issues, and improvements',
    options
  );
}

/**
 * Spawn OpenCode with arguments
 * @param {string[]} args - Arguments to pass to OpenCode
 * @returns {Promise<string>} OpenCode output
 */
function spawnOpenCode(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(OPENCODE_CMD, args);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`OpenCode exited with code ${code}: ${stderr}`));
      }
    });
  });
}

/**
 * Spawn a command and return output
 * @param {string} command - Command to run
 * @param {string[]} args - Arguments
 * @returns {Promise<string>} Command output
 */
function spawnCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const error = new Error(`Command failed with code ${code}`);
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
      }
    });
  });
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];

  switch (command) {
    case 'commit':
      generateCommitMessage()
        .then(msg => console.log(msg))
        .catch(err => console.error(err.message));
      break;

    case 'test-failures':
      analyzeTestFailures(process.argv[3])
        .then(analysis => console.log(analysis))
        .catch(err => console.error(err.message));
      break;

    case 'review':
      reviewChanges(process.argv[3])
        .then(review => console.log(review))
        .catch(err => console.error(err.message));
      break;

    default:
      console.log(`
OpenCode Driver - Usage:
  node driver.mjs commit              - Generate commit message from staged changes
  node driver.mjs test-failures [cmd] - Analyze test failures (default: npm test)
  node driver.mjs review [ref]        - Review changes (default: HEAD~1)
      `);
  }
}
