import i18n from "../../i18n/configs";
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
    language: "en" | "zh",
    languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        { name: "English", code: "en" },
        { name: "中文", code: "zh" }
    ]
};

export default (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload); // 有副作用，处理不标准
            return {
                ...state,
                language: action.payload
            };
        case ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload]
            };
        default:
            return state;
    }
};