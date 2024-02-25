import {useState} from "react";
import storedSchedule from "@/data/schedule.json"
import {StoredSchedule} from "@/types/common.ts";

interface Props {
  departureFrom: 'kazan' | 'inno'
}

const getCurrentTime = () =>
  new Intl.DateTimeFormat("ru-RU", {hour: "numeric", minute: "numeric"}).format(new Date())

const Timetable = ({departureFrom}: Props) => {
  const [isDayOff, setIsDayOff] = useState(false)
  const latestSchedule = (storedSchedule as StoredSchedule).at(-1)?.['parsed-schedule']
  let times: Array<{ minutes: string, isNow?: boolean }> = []
  if (latestSchedule) {
    const newTimes = latestSchedule.find(timesItem =>
      timesItem['day-type'] === (isDayOff ? 'day-off' : 'working')
      && timesItem['departs-from'] === departureFrom)
    const timetableDeparts = newTimes?.['departs-at'] || []
    times = [...timetableDeparts.map(x => ({minutes: x})), {minutes: getCurrentTime(), isNow: true}].sort((a, b) => {
      const aDate = new Date(`1.1.1 ${a.minutes}`)
      const bDate = new Date(`1.1.1 ${b.minutes}`)

      return aDate.getTime() - bDate.getTime()
    })
  }

  return (
    <section className='flex flex-col gap-2 items-center'>
      <ul>
        {times.map(time => <li
          key={time.isNow ? 'now' : time.minutes}>{time.isNow ? 'Вы находитесь здесь' : time.minutes}</li>)}
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