import { createContext, useContext, useState } from "react";

const initialStates = {
  theme: "default",
  setTheme: () => {},
  sections: {},
  setSections: () => {},
  businessName: "",
  setBusinessName: () => {},
  businessDescription: "",
  setBusinessDescription: () => {},
  imageQuery: "",
  setImageQuery: () => {},
  selectedOption: "hero",
  setSelectedOption: () => {},
};

const MyContext = createContext(initialStates);

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState(initialStates.theme);
  const [sections, setSections] = useState(initialStates.sections);
  const [businessName, setBusinessName] = useState(initialStates.businessName);
  const [businessDescription, setBusinessDescription] = useState(
    initialStates.businessDescription
  );
  const [imageQuery, setImageQuery] = useState(initialStates.imageQuery);
  const [selectedOption, setSelectedOption] = useState(
    initialStates.selectedOption
  );

  return (
    <MyContext.Provider
      value={{
        theme,
        setTheme,
        sections,
        setSections,
        businessName,
        setBusinessName,
        businessDescription,
        setBusinessDescription,
        imageQuery,
        setImageQuery,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export const useTheme = () => {
  const { theme, setTheme } = useContext(MyContext);
  return { theme, setTheme };
};

export const useSections = () => {
  const { sections, setSections } = useContext(MyContext);
  return { sections, setSections };
};

export const useBusinessName = () => {
  const { businessName, setBusinessName } = useContext(MyContext);
  return { businessName, setBusinessName };
};

export const useBusinessDescription = () => {
  const { businessDescription, setBusinessDescription } = useContext(MyContext);
  return { businessDescription, setBusinessDescription };
};

export const useImageQuery = () => {
  const { imageQuery, setImageQuery } = useContext(MyContext);
  return { imageQuery, setImageQuery };
};

export const useSelectedOption = () => {
  const { selectedOption, setSelectedOption } = useContext(MyContext);
  return { selectedOption, setSelectedOption };
};
