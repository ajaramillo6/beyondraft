import Header from "@/app/_components/Header";
import React from "react";

const GettingStarted: React.FC = () => {
  return (
    <>
    <Header />
    <div className="p-6 lg:max-w-6xl max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Getting Started Guide</h1>
      <section className="mb-6">
        <p>Welcome to Beyondraft! This guide will walk you through the first steps to get started with your projects.</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Creating a New Project</h2>
        <p>
          After registering and logging in, you should see a window prompting you to start a new project.
          You <strong>must</strong> create a project before you can start creating files.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Creating a New File</h2>
        <p>
          Once your project is set up, you can begin by creating a new file. When you click to create a file,
          a window will prompt you to enter a name for your new file.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3. Navigating Your File</h2>
        <ul className="list-disc list-inside">
          <li>Click on the file name (it highlights in blue when hovering) to navigate to it.</li>
          <li>
            Your workspace is divided into two sections:
            <ul className="list-circle list-inside ml-4">
              <li><strong>Left side:</strong> Note-taking section</li>
              <li><strong>Right side:</strong> Canvas section, which includes an initial example containing multiple frames representing schemas.</li>
            </ul>
          </li>
          <li>At the top, you will find options to view notes, both notes and canvas, or only canvas.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">4. Saving and Sharing Your Work</h2>
        <ul className="list-disc list-inside">
          <li>When switching views, changes will be saved and before exiting, you will be prompted to save your changes.</li>
          <li>A <strong>Save</strong> button is located at the top right-hand corner.</li>
          <li>
            Next to the save button is a <strong>Share</strong> button, allowing you to share a secured temporary link with a friend or client.
            The link remains accessible as long as the file is marked as <strong>"Published"</strong>.
          </li>
          <li>To rename your file, click on the file name at the top left-hand corner or go back to the dashboard and use the ellipsis.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5. File Management Options</h2>
        <p>Each file row on the dashboard has an <strong>ellipsis button</strong> with additional options:</p>
        <ul className="list-disc list-inside">
          <li>Rename</li>
          <li>Archive</li>
          <li>Delete (Caution: This action is permanent and will delete all content within the file.)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">6. Settings & Customization</h2>
        <ul className="list-disc list-inside">
          <li>In <strong>Settings</strong>, you can rename or delete your project using the <strong>ellipsis button</strong>.</li>
          <li>To change themes, click on the <strong>moon/sun icon</strong> in the header.</li>
          <li>To log out, click on your <strong>account icon</strong> (a circle displaying the first letter of your account name) in the top right-hand corner.</li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default GettingStarted;