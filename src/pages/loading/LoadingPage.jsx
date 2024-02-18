import Lottie from 'react-lottie';
import animationData from "./loadingLottie"
import { useRef, useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../baseUrl';

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LoadingPage = () => {
    const query = useQuery();
    const meetUpId = query.get('meetUpId');
    const isHost = query.get('isHost');
    const [streamJsonData, setStreamJsonData] = useState([]);
    const [isGenerateCalled, setIsGenerateCalled] = useState(false);
    const navigate = useNavigate();
    const isCalled = useRef(false)

    console.log(meetUpId);

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
            navigate("/onboarding");
            return;
        }
    }, [navigate]);

    const lottieRef = useRef(null);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const streamData = useCallback(async () => {
        const response = await fetch(`${baseUrl}/api/v1/icebreaking/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/stream+json',
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
            body: JSON.stringify({
                'id': meetUpId
            })
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log('Stream complete');
                navigate('/result?meetUpId=' + meetUpId);
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            try {
                const json = JSON.parse(chunk);
                setStreamJsonData(json);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
            return reader.read().then(processText);
        });
    }, [meetUpId, isGenerateCalled])

    useEffect(() => {
        if (isCalled.current) {
            return;
        }
        console.log('start streams', isHost, meetUpId, navigate, streamData);
        const joinMeetup = async () => {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(`${baseUrl}/api/v1/meet/join?meetUpId=${meetUpId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            console.log(response);
        }

        const startStream = async () => {
            await new Promise(r => setTimeout(r, 500));
            if (isHost === 'false') {
                await joinMeetup();
                await new Promise(r => setTimeout(r, 500));
                await streamData();
            } else {
                await new Promise(r => setTimeout(r, 500));
                await streamData();
            }
        }

        startStream();
        isCalled.current = true;
    }, []);


    useEffect(() => {
        const anim = lottieRef.current.anim;
        anim.addEventListener('complete', () => {
            const newDirection = anim.playDirection === 1 ? -1 : 1;
            anim.setDirection(newDirection);
            anim.play();
        });
    }, [lottieRef]);


    return (
        <div className='flex items-center justify-center h-full'>
            <div>
                <div className='text-slate-500 text-2xl font-bold text-center'>
                    친구 카드를 만들고 있어요
                </div>

                <div className='' >
                    <Lottie ref={lottieRef} options={defaultOptions} height={300} width={300} isClickToPauseDisabled />
                </div>

                {/* <div>
                    {JSON.stringify(streamJsonData)}
                </div> */}
            </div>
        </div>
    );
}

export default LoadingPage;