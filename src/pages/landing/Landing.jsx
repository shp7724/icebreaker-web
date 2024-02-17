import { Link } from 'react-router-dom';
import logo from '../../../static/friend_circle.svg';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const Landing = () => {
    const navigate = useNavigate();

    useEffect(async () => { 
        const accessToken = Cookies.get('accessToken');

        if(accessToken) {
            navigate("/mypage");
        } else {
            navigate("/onboarding");
        }
    });

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
            <div className="text-base font-medium">
                <div className='mb-3'>
                    (어쩌구 소개 문구)
                </div>
                <div>
                    아이스브레이킹을 도와줄거예요.
                </div>
            </div>
            <img src={logo} className="w-40 h-28" alt="logo" />
            <div className="text-xl font-semibold text-slate-500">
                나에 대해 알려주세요
            </div>

            {/* Buttons for debugging */}
            <div className="flex flex-col space-y-5 border-red-600 border-dashed border-2 p-4 rounded-md mt-20">
                <div className="text-lg font-semibold text-red-500">
                    디버그용
                </div>
                <Link className="px-4 py-2 text-white bg-red-500 rounded-md" to="/onboarding">온보딩 페이지 가기</Link>
                <Link className="px-4 py-2 text-white bg-red-500 rounded-md" to="/mypage">마이페이지 가기</Link>
                <Link className="px-4 py-2 text-white bg-red-500 rounded-md" to="/loading">로딩 페이지 가기</Link>
                <Link className="px-4 py-2 text-white bg-red-500 rounded-md" to="/result">결과 페이지 가기</Link>
            </div>
        </div>
    );
}

export default Landing;
