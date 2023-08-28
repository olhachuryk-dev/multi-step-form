## Used libraries:
*  - React
*  - ReactDOM
*  - TypeScript
*  - Redux
*  - Redux Toolkit
*  - React-hook-form: https://react-hook-form.com/api/useformcontext/
*  - - The library aims to provide users with a smoother interaction experience by fine-tuning the performance and improving accessibility. Some of the performance enhancements include:
*  - - - Introducing form state subscription model through the proxy
*  - - - Avoiding unnecessary computation
*  - - - Isolating component re-rendering when required
*  - - Overall, it improves the user experience while users interact with the application. As for the developers, we introduce built-in validation and are closely aligned with HTML standards allowing further extension with powerful validation methods and integration with schema validation natively. In addition, having a strongly type-checked form with the help of typescript provides early build-time feedback to help and guide the developer to build a robust form solution.

## Regexr:
* - name: Two words required, 3rd is optional ^(\w{2,20}\ \w{2,20}(\ \w{2,20})?) 
* - phone: any format (+91 (123) 456 7890, +91 123 456 7890, 1234567890 etc.), max 12 numbers: ^(\+?\d{1,3}\s?)?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$
* - email: regular email, @ sign, min 2 letters after @ and . [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$