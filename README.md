# DYPU RIMS Portal

This repository contains the client-side code for DYPU RIMS (Research Information Management System). The portal was built using NextJS and SCSS, and it aimed to automate the submission and management of research papers for Dr. DY Patil Medical College, one of the largest medical universities in the country.

## Features

- **Automated Paper Submission:** The portal provides a user-friendly interface for researchers to submit their research papers electronically, streamlining the submission process and eliminating manual paperwork.

- **Research Paper Management:** The system allows faculty members and concerned administrators to view and analyze published data related to research papers. It implements a secure three-tier login system to ensure only authorized users can access and interact with the data.

- **Extensible System:** Besides managing research papers, the portal was designed to handle various other aspects of academic work. It includes functionality for supervising papers, managing awards, publications, intellectual property rights (IPRs), and projects.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bit-by-bits/DYP-RIMS.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The portal will be accessible at `http://localhost:3000`.

## Deployment

To deploy the DYPU RIMS Portal to a production environment, follow these steps:

1. Build the optimized production-ready code:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm start
   ```

   The portal will be accessible based on the server configuration.

## Contributing

Contributions to the DYPU RIMS Portal are currently closed. If you happen to have any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
