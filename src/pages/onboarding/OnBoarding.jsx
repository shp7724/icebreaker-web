import BotChatBox from "./BotChatBox";
import MyChatBox from "./MyChatBox";
import Input from "./Input";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState('NAME');
  const [inputs, setInputs] = useState({});
  const completedStages = Object.keys(inputs);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [stage ]);

  const submit = () => {
    const data = JSON.stringify(inputs);
    console.log(data); // FIXME: cache
    fetch(
      'https://icebreaker.wafflestudio.com/login',
      {
        method: 'POST',
        headers: { 'Authorization': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          return;
        } 

        Cookies.set('accessToken', response.json('accessToken'));
        navigate('/mypage');
      });
  };

  return (
      <div className="w-full min-h-screen relative bg-slate-100 overflow-y-scroll">
        <div>
          <div className='h-[20px]'></div>
          <div className="mb-[12px]"> 
            <BotChatBox text="이름을 알려주세요!"/>
          </div>
          {inputs['NAME'] !== undefined && (
          <div className="mb-[12px]">
            <MyChatBox text={inputs['NAME'] === '' ? '패스할래요' : inputs['NAME'] } enabled = {inputs['NAME'] !== ''} />
          </div>
          )}
          {completedStages.includes('NAME') &&(
          <div className="mb-[12px]">
            <BotChatBox text="어떤 학과에 재학중인가요?"/>
          </div>  
          )}
          {inputs['MAJOR'] !== undefined && (
          <div className="mb-[12px]">
            <MyChatBox text={inputs['MAJOR'] === '' ? '패스할래요' : inputs['MAJOR'] } enabled = {inputs['MAJOR'] !== ''}/>
          </div>
          )}
          {completedStages.includes('MAJOR') &&(
          <div className="mb-[12px]">
            <BotChatBox text="어느 지역에 살고 있나요?"/>
          </div>  
          )}
          {inputs['LOCATION'] !== undefined && (
          <div className="mb-[12px]">
            <MyChatBox text={inputs['LOCATION'] === '' ? '패스할래요' : inputs['LOCATION'] } enabled = {inputs['LOCATION'] !== ''}/>
          </div>
          )}
          {completedStages.includes('LOCATION') &&(
          <div className="mb-[12px]">
            <BotChatBox text="MBTI가 무엇인가요?"/>
          </div>  
          )}
          {inputs['MBTI'] !== undefined && (
          <div className="mb-[12px]">
            <MyChatBox text={inputs['MBTI'] === '' ? '패스할래요' : inputs['MBTI'] } enabled = {inputs['MBTI'] !== ''}/>
          </div>
          )}
          {completedStages.includes('MBTI') &&(
          <div className="mb-[12px]">
            <BotChatBox text="생년월일을 알려주세요."/>
          </div>  
          )}
          {inputs['BIRTHDATE'] !== undefined && (
          <div className="mb-[12px]">
            <MyChatBox text={inputs['BIRTHDATE'] === '' ? '패스할래요' : inputs['BIRTHDATE'] } enabled = {inputs['BIRTHDATE'] !== ''}/>
          </div>
          )}
          {completedStages.includes('BIRTHDATE') &&(
          <div className="mb-[12px]">
            <BotChatBox text="학번도 알려주세요."/>
          </div>  
          )}
          {inputs['HAKBEON'] !== undefined && (
          <div className="mb-[12px]">
            <MyChatBox text={inputs['HAKBEON'] === '' ? '패스할래요' : inputs['HAKBEON'] } enabled = {inputs['HAKBEON'] !== ''}/>
          </div>
          )}
          {completedStages.includes('HAKBEON') &&(
          <div className="mb-[12px]">
            <BotChatBox text="성별을 알려주세요."/>
          </div>  
          )}
          {inputs['SEX'] !== undefined && (
          <div className="mb-[12px]">
            <MyChatBox text={inputs['SEX'] === '' ? '패스할래요' : inputs['SEX'] } enabled = {inputs['SEX'] !== ''}/>
          </div>
          )}
          <div className="h-[81px]"></div>
        </div>
        <Input stage={stage} setStage={setStage} setInputs={setInputs} submit={submit}/>  
      </div>
  )
}

export default OnBoarding;
