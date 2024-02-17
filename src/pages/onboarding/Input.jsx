import React, { useState } from 'react';
import send from '../../../static/send.svg';

const Input = ({stage, setStage, setInputs, submit}) => {
    const [inputText, setInputText] = useState('');

    const onInputChanged = (e) => setInputText(e.target.value);
    const isInputEmpty = inputText === '';
    var placeHolder = 'abc';
    
    switch(stage) {
        case 'NAME':
            placeHolder = '김와플';
            break;
        case 'MAJOR':
            placeHolder ='컴퓨터공학부';
            break;
        case 'LOCATION':
            placeHolder ='서울시, 서울 관악구, 봉천동..';
            break;
        case 'MBTI':
            placeHolder = 'INTJ';
            break;
        case 'BIRTHDATE':
            placeHolder ='2003년 1월 1일 00시';
            break;
        case 'HAKBEON':
            placeHolder ='__학번';
            break;
        case 'SEX':
            placeHolder = '여자';
    }

    const onAnswered= () => {
        switch(stage) {
            case 'NAME':
                setStage('MAJOR');
                setInputs((old) => {
                    return {...old, ...{'NAME': inputText}};
                });
                break;
            case 'MAJOR':
                setStage('LOCATION');
                setInputs((old) => {
                    return {...old, ...{'MAJOR': inputText}};
                });
                break;
            case 'LOCATION':
                setStage('MBTI');
                setInputs((old) => {
                    return {...old, ...{'LOCATION': inputText}};
                });
                break;
            case 'MBTI':
                setStage('BIRTHDATE');
                setInputs((old) => {
                    return {...old, ...{'MBTI': inputText}};
                });
                break;
            case 'BIRTHDATE':
                setStage('HAKBEON');
                setInputs((old) => {
                    return {...old, ...{'BIRTHDATE': inputText}};
                });
                break;
            case 'HAKBEON':
                setStage('SEX');
                setInputs((old) => {
                    return {...old, ...{'HAKBEON': inputText}};
                });
                break;
            case 'SEX':
                setStage('FINISH');
                setInputs((old) => {
                    return {...old, ...{'SEX': inputText}};
                });
                break;
        }

        setInputText('');
    }

    return (
        <div className="md:w-[640px] h-[50px] ml-[24px] mr-[24px] mb-[15px] fixed bottom-0">
            {stage !== 'FINISH' && (
            <div>
                <input
                    ref={input => input && input.focus()}
                    className="pl-[24px] w-full h-[50px] bg-slate-300 rounded-[11px] text-[15px] font-medium font-['Pretendard'] focus:outline-none"
                    placeholder={placeHolder}
                    onChange={onInputChanged}
                    value={inputText}
                />
                {isInputEmpty && (
                <div className="right-[22px] top-[16px] absolute text-white text-[15px] font-medium font-['Pretendard']" onClick={onAnswered}>패스할래요</div>
                )}
                {!isInputEmpty && (
                <img src={send} className="right-[13px] top-[13px] absolute w-[24px] h-[24px]" alt="send" onClick={onAnswered}/>)
                }
            </div>
            )}
            {stage === 'FINISH' && (
            <div className='flex justify-center'>
                <div className="w-[100px] h-[42px] px-6 py-3 bg-slate-400 rounded-[20px] gap-2.5 inline-flex">
                    <div className="text-white text-[15px] font-medium font-['Pretendard']" onClick={submit}>시작하기</div>
                </div>
            </div>)
            }
        </div>
    )
}

export default Input;