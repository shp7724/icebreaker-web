import InfoIce from "./InfoIce";
import resetIcon from '../../../static/reset.svg';
import myPageIcon from '../../../static/mypage.svg';
import PhotosBottomSheet from "./PhotosBottomSheet";
import { useRef, useState, useEffect } from "react";
import QRCodeBottomSheet from "./QRCodeBottomSheet";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { baseUrl, clientUrl } from '../../baseUrl';

const MyPage = () => {
    const badgesRef = useRef();
    const photosBottomSheetRef = useRef();
    const [qrCodeUrl, setQrCodeUrl] = useState();
    const navigate = useNavigate();
    const [informations, setInformtaions] = useState([]);
    const [meetUpId, setMeetUpId] = useState();

    useEffect(() => {
        async function fetchData() {
            const accessToken = Cookies.get('accessToken');

            if (!accessToken) {
                navigate("/onboarding");
                return;
            }

            const response = await fetch(
                `${baseUrl}/api/v1/user/me`,
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                }
            )

            if (response && response.status === 200) {
                const responseJson = await response.json();
                setInformtaions(responseJson['information']);
            }
        }

        fetchData();
    }, [navigate]);

    const handlePhotoUploadFinished = async () => {
        var meetUpId = await peakMeetUpId();
        if (!meetUpId) {
            await makeMeetupRequest();
            meetUpId = await peakMeetUpId();
        }
        setMeetUpId(meetUpId);
        // https://icebreaker.wafflestudio.com
        // /loading?meetUpId=290b72b2-7f6d-420d-a0b2-1c64b03b3c9e::41&isHost=false
        // https://icebreaker.wafflestudio.com/api/v1/meet/meet?meetUpId=290b72b2-7f6d-420d-a0b2-1c64b03b3c9e::41
        setQrCodeUrl(`${clientUrl}/loading?meetUpId=${meetUpId}&isHost=false`);
    }

    const makeMeetupRequest = async () => {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/api/v1/meet/request`,
            {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` },
            }
        );
        console.log(response);
    }

    const peakMeetUpId = async () => {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/api/v1/meet/request/status`,
            {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            }
        );

        const responseData = await response.json();
        return responseData['meetUpId']
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const accessToken = Cookies.get('accessToken');
            if (!meetUpId) {
                return;
            }
            const response = await fetch(
                `${baseUrl}/api/v1/meet/meet?meetUpId=${meetUpId}`,
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                }
            );

            if (response && response.status === 200) {
                if (response.headers.get('content-length') === '0' || !response.body) {
                    // setIsFriendJoined(false);
                } else {
                    navigate(`/loading?meetUpId=${meetUpId}&isHost=true`);
                    clearInterval(interval);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [meetUpId, navigate]);


    return (
        <>
            <div className="px-8 py-5 flex items-center gap-1">
                <img src={myPageIcon} />
                <h1 className="text-slate-400 text-l font-bold">나의 TMI</h1>
            </div>
            <div ref={badgesRef} className="flex flex-wrap px-8 gap-3 pb-8">
                {
                    informations
                        .filter(info => ['IMAGE_URL', 'IMAGE_SUMMARY'].includes(info.type) === false)
                        .map((info, index) => (
                            <InfoIce key={index} type={info.type} text={info.value} />
                        ))
                    // ['김와플', '컴퓨터공학부', 'INFP', '김와플', '컴퓨터공학부', 'INFP', '김와플', '컴퓨터공학부', 'INFP'].map((text, index) => (
                    //     <InfoIce key={index} text={text} />
                    // ))
                }
                <button className="inline-flex items-center justify-center px-1 active:scale-90 transition-all active:bg-slate-200 rounded-2xl">
                    <img src={resetIcon} />
                </button>
                <button onClick={() => {
                    setQrCodeUrl('https://developers.line.biz/assets/img/richmenu-template-guide-07.9ef1ba08.png')
                }}>Set QR Code</button>

            </div>
            <PhotosBottomSheet badgesRef={badgesRef} ref={photosBottomSheetRef} handlePhotoUploadFinished={handlePhotoUploadFinished} />
            {qrCodeUrl && (
                <QRCodeBottomSheet qrCodeUrl={qrCodeUrl} />
            )}
        </>
    );
}

export default MyPage;