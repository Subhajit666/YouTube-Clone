import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNav = () => {
    const { selectCategories, setselectCategories, mobileMenu } =
        useContext(Context);

    const navigate = useNavigate();
    const [isScrolling, setIsScrolling] = useState(false);
    let timeoutId; 

    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                setselectCategories(name);
                break;
            case "home":
                setselectCategories(name);
                break;
            case "menu":
                return false;
            default:
                break;
        }
    };

    const handleScroll = () => {
        setIsScrolling(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setIsScrolling(false);
        }, 700); 
    };

    return (
        <div
            className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 ${
                mobileMenu ? "translate-x-0" : "translate-x-[-240px]"
            } md:translate-x-0 transition-all`}
            onScroll={handleScroll}
            style={{ scrollbarWidth: isScrolling ? "auto" : "none" }}
        >
            <div className="flex px-5 flex-col">
                {categories.map((item) => (
                    <React.Fragment key={item.name}>
                        <LeftNavMenuItem
                            text={item.type === "home" ? "Home" : item.name}
                            icon={item.icon}
                            action={() => {
                                clickHandler(item.name, item.type);
                                navigate("/");
                            }}
                            className={`${selectCategories === item.name ? "bg-white/[0.15]" : ""}`}
                        />
                        {item.divider && <hr className="my-5 border-white/[0.2]" />}
                    </React.Fragment>
                ))}
                <hr className="my-5 border-white/[0.2]" />
                <div className="text-white/[0.5] text-[12px]">
                    <p>About Press Copyright Contact us Creator Advertise Developers</p>
                    <br />
                    <p>Terms Privacy Policy & SafetyHow YouTube worksTest new features</p>
                    <br />
                    <p>© 2024 Google LLC</p>
                    <br />
                    <p>Cloned by Subhajit</p>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
