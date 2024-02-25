import React, {useState} from "react";
import schedule from "@/data/schedule.json"
import {StoredSchedule} from "@/types/common.ts";

const Settings = () => {
  const [scheduleState, setScheduleState] = useState<null | 'not-valid' | 'is-valid'>(null)

  const handleScheduleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const storedBotMessage = (schedule as StoredSchedule).at(-1)?.['bot-message']
    if (storedBotMessage === e.target.value) {
      setScheduleState('is-valid')
    } else {
      setScheduleState('not-valid')
    }
  }

  return (
    <>
      <section className='flex flex-col gap-2 items-center'>
        <h2 className='text-2xl'>Проверить расписание</h2>
        <ul className='text-left list-disc'>
          <li>открыть <a href="https://t.me/InnoHelpBot">InnoHelpBot</a></li>
          <li>клик на 🚌</li>
          <li>клик на 108</li>
          <li>вставить ответ в поле ниже</li>
        </ul>
        <textarea
          className="textarea textarea-bordered min-h-32 leading-tight w-full"
          placeholder="Ответ бота с расписанием"
          onChange={handleScheduleChange}
        />
        {scheduleState === 'is-valid' && (
          <div role="alert" className="alert alert-success text-white font-bold bg-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Расписание актуально</span>
          </div>
        )}
        {scheduleState === 'not-valid' && (
          <div role="alert" className="alert alert-error text-white font-bold bg-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Расписание не обновлено</span>
          </div>
        )}
      </section>
      <section className='flex flex-col gap-2 items-center'>
        <h2 className='text-2xl'>Полезные ссылки</h2>
        <ul className='text-left list-disc'>
          <li>Канал со статусами автобусов <a href="https://t.me/innobus">innobus</a></li>
          <li>Такси Иннополис <a href="https://t.me/Innopolistaxi">Innopolistaxi</a></li>
          <li><a href="https://taxi.yandex.ru">Яндекс GO</a></li>
          <li><a href="https://t.me/joinchat/BZaU2UDW8zpUizpiMvDRQA">Чат попутчиков</a></li>
        </ul>
      </section>
    </>
  );
};

export default Settings;