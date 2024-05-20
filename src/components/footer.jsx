import React from "react";

function Footer() {
  return (
    <footer class="flex justify-between items-center fixed bottom-0 left-0 right-0 w-fit mx-auto">
      <div class="mx-auto max-w-fit px-4 py-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <p class="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
          © 2024 Copyright:<span style={{color:"blue"}}> Designed and Developed By TechDarshak</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
