import React, { useState, useRef, useEffect } from 'react'
import "./PasswordGenerator.scss"
import { copyIcon, refreshIcon } from '@/assets'

interface PasswordSettings {
    uppercase: boolean,
    lowercase: boolean,
    number: boolean,
    symbol: boolean,
}

function generatePassword(length: number, useUppercase?: boolean, useLowercase?: boolean, useSymbols?: boolean, useNumbers?: boolean): string {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const symbolChars = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
    const numberChars = "0123456789";

    let validChars = "";
    if (useUppercase) validChars += uppercaseChars;
    if (useLowercase) validChars += lowercaseChars;
    if (useSymbols) validChars += symbolChars;
    if (useNumbers) validChars += numberChars;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    return password;
}



function PasswordGenerator() {
    const [passwordLength, setPasswordLength] = useState<number>(6)
    const [strength, setStrength] = useState<string>("Low password strength")
    const [settings, setSettings] = useState<PasswordSettings>({ uppercase: true, lowercase: false, number: true, symbol: true })
    const [password, setPassword] = useState<string>(generatePassword(6, true, false, true, true))
    const inputRef = useRef<HTMLInputElement>(null);
    const [str, setStr] = useState<number>(9)

    function handleClick() {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.textContent?.toString() || "")
        }
    }

    //MAX SCORE = 13*4 = 52
    //MIN SCORE = 1*1 = 1
    //SCORE = (LEN-3) * (num of)SETTINGS

    useEffect(() => {
        setPassword(generatePassword(passwordLength, settings.uppercase, settings.lowercase, settings.symbol, settings.number))
    }, [passwordLength, settings])

    useEffect(() => {
        let numSettings = 0
        if (settings.uppercase) numSettings++
        if (settings.lowercase) numSettings++
        if (settings.symbol) numSettings++
        if (settings.number) numSettings++
        setStr((passwordLength - 3) * numSettings)
    }, [password])

    useEffect(() => {
        setStrength(str <= 26 ? 'Low' : str <= 39 ? 'Average' : 'High')
    }, [str])

    //SLIDER BACKGROUND
    const input = document.querySelector("input") || document.createElement("input");
    function setBackgroundSize() {
        input.style.setProperty("--background-size", `${getBackgroundSize()}%`);
    }
    setBackgroundSize();
    input.addEventListener("input", () => setBackgroundSize());
    function getBackgroundSize() {
        const min = +input.min || 0;
        const max = +input.max || 100;
        const value = +input.value;
        const size = (value - min) / (max - min) * 100;
        return size;
    }


    return (
        <div className='password_generator'>
            <h1 className='password_generator_title'>Password Generator</h1>
            <div className='password_generator_characters'>
                <div className='password_generator_characters_text'>
                    <div>Character Length:</div>
                    <div>{passwordLength}</div>
                </div>
                <input className="password_generator_slider" type="range" min="4" max="16" value={passwordLength} onChange={(e) => setPasswordLength(parseInt(e.target.value))} />
            </div>
            <div className='password_generator_include'>
                <div>
                    <input type="checkbox" checked={settings.uppercase} onChange={() => setSettings({ ...settings, uppercase: !settings.uppercase })} />
                    <div>Include Uppercase Letter</div>
                </div>
                <div>
                    <input type="checkbox" checked={settings.lowercase} onChange={() => setSettings({ ...settings, lowercase: !settings.lowercase })} />
                    <div>Include Lowercasecase Letter</div>
                </div>
                <div>
                    <input type="checkbox" checked={settings.number} onChange={() => setSettings({ ...settings, number: !settings.number })} />
                    <div>Include Numbers</div>
                </div>
                <div>
                    <input type="checkbox" checked={settings.symbol} onChange={() => setSettings({ ...settings, symbol: !settings.symbol })} />
                    <div>Include Symbols</div>
                </div>
            </div>
            <div className='password_generator_strength'>
                <div className='password_generator_strength_text'>
                    <div>Strength</div>
                    <div>{strength} password strength</div>
                </div>
                <div className='password_generator_strength_tiles'>
                    <div className={`password_generator_strength_tile ${strength}`}></div>
                    <div className={`password_generator_strength_tile ${str > 13 ? strength : ''}`}></div>
                    <div className={`password_generator_strength_tile ${str > 26 ? strength : ''}`}></div>
                    <div className={`password_generator_strength_tile ${str > 39 ? strength : ''}`}></div>
                </div>
            </div>
            <div className='password_generator_result'>
                <div ref={inputRef}>{password} </div>
                <img onClick={() => setPassword(generatePassword(passwordLength, settings.uppercase, settings.lowercase, settings.symbol, settings.number))} src={refreshIcon}></img>
            </div>
            <div className='password_generator_copy' onClick={handleClick}>
                <img src={copyIcon}></img>
                <div>Copy Password</div>
            </div>
        </div>
    )
}

export default PasswordGenerator