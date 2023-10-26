import { useState } from "react";
import languages from "../languages.json";

const AddLanguage = ({user, setUser}) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");

    const language_handler = (proficiency) => {
        const proficiencies = ["Beginner", "Intermediate", "Fluent"];
    
        proficiencies.forEach((prof) => {
          if (proficiency === prof && lang !== "") {
            user.languagesLearning.forEach((l) => {
              if (l.language === lang) {
                return;
              }
            });
            setUser((prev) => {
              return {
                ...prev,
                languagesLearning: [
                  ...prev.languagesLearning,
                  { language: lang, proficiency: proficiency },
                ],
              };
            });
          }
        });
      };

      const changeLanguage = (lang) => {
        if (lang.value.toLowerCase() !== selected.toLowerCase()) {
          setSelected(lang.value);
          setOpen(false);
          setInputValue("");
        }

      }

    return <div>
    {user.languagesLearning.map((l, i) => {
      return <div key={i} className="flex w-96 justify-evenly font-medium">
      <div>
      <div
        onClick={() => setOpen(!open)}
        className={`w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        <button type="button">
        {l.language.length > 25 ? l.language.substring(0, 25) + "..." : l.language ? l.language: "Select Language"}
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input
            type="text"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value.toLowerCase())
            }
            placeholder="Enter language"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
          {languages.map((lang) => (
          <li
            key={lang.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
            lang.value.toLowerCase() === selected.toLowerCase() &&
            "bg-sky-600 text-white"
            }
            ${
            lang?.value?.toLowerCase().startsWith(inputValue)
            ? "block"
            : "hidden"
            }`}
            onClick={() => changeLanguage(lang)}
          >
            {lang.value}
          </li>
        ))}
      </ul>
      </div>
      <select className="max-h-10 bg-gray-200">
                  {
                  ["Beginner", "Intermediate", "Advanced"].map((prof, i) => {
                    return <option key={i} value={prof}>{prof}</option>
                  })
                }
                </select>
    </div>
    })}
    <button
    type="button"
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Add field
            </button>
  </div>
}

export default AddLanguage