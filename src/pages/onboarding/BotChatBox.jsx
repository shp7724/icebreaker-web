const BotChatBox = ({text}) => {
    return (
        <div className="h-[37px] ml-[30px] px-4 py-2 bg-white justify-start items-center gap-2.5 inline-flex">
          <div className="text-slate-600 text-sm font-medium font-['Pretendard'] leading-[21px]">{text}</div>
        </div>
    )
}

export default BotChatBox;
