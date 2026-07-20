import React from 'react';

const CVPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="w-full max-w-5xl h-[80vh] shadow-xl border border-[#1b2c68a0] rounded-lg overflow-hidden relative z-10 bg-[#0d1224]">
        <iframe
          src="/cv.pdf"
          className="w-full h-full"
          title="Resume / CV"
        />
      </div>
    </div>
  );
};

export default CVPage;
