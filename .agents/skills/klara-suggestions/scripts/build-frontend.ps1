param (
    [switch]$Watch = $false
)

$FrontendDir = Join-Path $PSScriptRoot "..\..\..\..\KlaraApp\frontend"

Write-Host "Navigating to $FrontendDir..." -ForegroundColor Cyan
Set-Location $FrontendDir

if ($Watch) {
    Write-Host "Running Webpack in WATCH mode..." -ForegroundColor Yellow
    & npm.cmd run watch
} else {
    Write-Host "Building Klara frontend..." -ForegroundColor Green
    & npm.cmd run build
}

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}

Write-Host "Build completed successfully!" -ForegroundColor Green
