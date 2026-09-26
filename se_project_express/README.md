WTWR (What to Wear?) API — Back End:

A robust RESTful API built with Node.js and Express to power the WTWR (What to Wear?) application. This service handles secure user authentication, password hashing, clothing inventory, weather-based categorization, and interactive features like item favoriting and ownership validation, backed by MongoDB and Mongoose.

Key Features:

-Secure Authentication & Authorization: Stateless session management using JSON Web Tokens (jsonwebtoken) and secure cryptographic password hashing (bcryptjs) with automatic field exclusion (select: false).

-RESTful Architecture: Comprehensive routing and controllers supporting full CRUD operations for users and clothing items with protected resource boundaries.

-Database Modeling & Validation: Schemas built with Mongoose featuring strict data typing, custom validators (URL validation via the validator package), unique index enforcement on emails, and enum constraints for weather types.

-Role-Based Route Protection: Middleware safeguards ensuring users can only modify or delete items they own, returning proper 403 Forbidden checks where applicable.

-Interactive Functionality: Endpoint logic supporting dynamic user interactions, including liking and unliking items with built-in duplicate prevention.

-Centralized Error Handling: Standardized HTTP status codes (400, 401, 403, 404, 409, 500) and structured JSON error responses utilizing Mongoose's .orFail() handling and validation checks.

-Development Workflow: Integrated cross-origin resource sharing (CORS), hot-reloading via Nodemon, and automated code styling enforced by ESLint (Airbnb JavaScript Style Guide) and Prettier.

Technologies & Techniques Used:

-Node.js & Express.js: Serves as the core runtime environment and web framework, managing middleware execution, routing, and HTTP requests/responses.

-MongoDB & Mongoose: Utilized for NoSQL database management and object data modeling, enforcing schema validation, unique constraints, and relationships.

-JWT & Bcryptjs: Industry-standard packages used to secure endpoints with token-based authentication and safe password encryption.

-ESLint & Prettier: Configured with the Airbnb JavaScript Style Guide preset to maintain clean, consistent, and error-free code across the entire codebase.

-Nodemon: Used in development to automatically restart the server upon file changes, streamlining the build and test cycle.

-Postman & GitHub Actions: Integrated for end-to-end API validation, automated integration testing, and CI pipeline checks.

Back-end Demo Video - https://www.loom.com/share/0bf7410d98924e8e82496d3c0055b1e2

Front-end Demo Video - https://www.loom.com/share/0bf7410d98924e8e82496d3c0055b1e2

github link-https://github.com/Connorcraig76/se_project_express.git
