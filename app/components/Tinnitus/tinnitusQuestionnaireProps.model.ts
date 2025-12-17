import type { QuestionnaireEntry } from "./questionnaiteEntry.model";

export interface TinnitusQuestionnaireProps {
    onSave: (entry: QuestionnaireEntry) => void;
}