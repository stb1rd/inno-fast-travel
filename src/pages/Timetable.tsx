import {useState} from "react";
import storedSchedule from "@/data/schedule.json"
import {StoredSchedule} from "@/types/common.ts";

interface Props {
  departureFrom: 'kazan' | 'inno'
}

const Timetable = ({departureFrom}: Props) => {
  const [isDayOff, setIsDayOff] = useState(false)
  const latestSchedule = (storedSchedule as StoredSchedule).at(-1)?.['parsed-schedule']
  let times: string[] = []
  if (latestSchedule) {
    const newTimes = latestSchedule.find(timesItem =>
      timesItem['day-type'] === (isDayOff ? 'day-off' : 'working')
      && timesItem['departs-from'] === departureFrom)
    times = newTimes?.['departs-at'] || []
  }

  return (
    <section className='flex flex-col gap-2 items-center'>
      <ul>
        {times.map(time => <li key={time}>{time}</li>)}
      </ul>
      <label className="label cursor-pointer flex gap-2">
        <span className="label-text">Выходной</span>
        <input type="checkbox" className="checkbox" checked={isDayOff} onChange={() => {
          setIsDayOff(!isDayOff)
        }}/>
      </label>
    </section>
  );
};

export default Timetable;