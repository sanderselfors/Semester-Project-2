# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Resources

- [Brief](https://fed-vocational-astro-course.vercel.app/en/semester-project-2/brief)
- [Design](https://www.figma.com/file/wvdsVMJmjMXmxc6GZ6VcJS/Semester-Project-2?type=design&node-id=0-1&mode=design&t=G1KVGCeeTgPxx7y2-0)
- [Production deploy](https://sp2bidit.netlify.app/)
- [Deployment CI](https://app.netlify.com/sites/sp2bidit/overview)
- [API Docs](https://docs.noroff.dev/auctionhouse-endpoints/authentication)

## Report

Summary
This report outlines the process of developing an online auction platform, covering the journey from initial design to the completion of the website. The project aimed to meet specific user requirements provided in the form of user stories and acceptance criteria, ensuring a user-friendly and functional platform.

Body
2. Introduction
The project began with a clear set of objectives outlined in user stories and acceptance criteria. The focus was on creating an online auction platform accessible to users with stud.noroff.no emails. The essential features included user management, dashboard functionalities, listing creation, bidding capabilities, and search functionality. Additionally, optional success criteria were defined to enhance testing, set up distinct environments, and optimize the user interface and media.

3. Design and Planning
The design phase involved using Figma to create a visual representation of the website. This step as always helped me in planning the layout, user interactions, and overall look and feel of the platform. Concurrently, I made a Gantt chart for project planning, breaking down tasks and timelines to ensure a systematic approach to development.

4. Development
In this project I utilized React for building the front end and Tailwind CSS for styling, with DaisyUI contributing to design elements. React provided a modular structure, making it easier to create dynamic user interfaces. Tailwind CSS facilitated a straightforward styling approach, and DaisyUI streamlined the integration of pre-built components, ensuring a cohesive design.

5. Testing
To meet the optional success criteria, I wrote end-to-end tests for important user journeys. This testing phase aimed to validate that features like user login, search functionality, and bidding were functioning as intended.

6. Environment Setup
Distinct staging and production environments were established within the repository. This setup allowed for testing changes in a controlled environment (staging) before deploying to the live platform (production).

7. Optimization
The user interface underwent optimization to include fluid animations, media optimization for improved web performance, and loading states to enhance user feedback during data retrieval. I used Framer Motion for a fluid experience.

8. Conclusion
The process, from design to the finished website, involved a systematic approach that considered user needs, project timelines, and testing mechanisms. The combination of design tools, development frameworks, and testing procedures ensured the successful implementation of features and optional criteria, resulting in a polished online auction platform ready for use. Definatly the most challenging project we have had, but fun!

## Getting Started

In the project directory, you can run:

- install the project node module dependencies $`npm i`
- Runs the app in the development mode. `npm run dev`

## Authors

- Sander Selfors (@sanderselfors)