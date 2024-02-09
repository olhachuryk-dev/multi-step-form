import { ref, set } from "firebase/database";
import database from "./firebaseInit";
import { IMultistepForm } from "../../types/IMultistepForm";

export function setFormStructure(formId: string, form: IMultistepForm) {
  //https://firebase.google.com/docs/database/web/lists-of-data?hl=en&authuser=0#reading_and_writing_lists
  const dbRef = ref(database, formId);
  set(dbRef, form);
}

export function setFormAnswers(
  formId: string,
  userId: string,
  answers: Object
) {
  const dbRef = ref(database, formId + "/answers/" + userId);
  set(dbRef, answers);
}
