export default function preventFormSubmitByEnter(
  e: React.KeyboardEvent<HTMLFormElement>
) {
  if (e.key === "Enter") e.preventDefault();
}
