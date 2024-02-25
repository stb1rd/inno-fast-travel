import {useState} from "react";
import storedSchedule from "@/data/schedule.json"
import {StoredSchedule} from "@/types/common.ts";

interface Props {
  departureFrom: 'kazan' | 'inno'
}

interface TimeWithMinutes {
  minutes: string,
  isNow?: boolean
}

const MINUTES_GAP = 90

const getCurrentTime = () =>
  new Intl.DateTimeFormat("ru-RU", {hour: "numeric", minute: "numeric"}).format(new Date())

const compareByMinutes = (a: TimeWithMinutes, b: TimeWithMinutes) => {
  const aDate = new Date(`1.1.1 ${a.minutes}`)
  const bDate = new Date(`1.1.1 ${b.minutes}`)

  return aDate.getTime() - bDate.getTime()
}

const Timetable = ({departureFrom}: Props) => {
  const [isDayOff, setIsDayOff] = useState(false)
  const [areRelevantFiltered, setAreRelevantFiltered] = useState(false)

  const latestSchedule = (storedSchedule as StoredSchedule).at(-1)?.['parsed-schedule']
  let times: TimeWithMinutes[] = []
  if (latestSchedule) {
    const newTimes = latestSchedule.find(timesItem =>
      timesItem['day-type'] === (isDayOff ? 'day-off' : 'working')
      && timesItem['departs-from'] === departureFrom)
    const timetableDeparts = newTimes?.['departs-at'] || []
    times = [...timetableDeparts.map(x => ({minutes: x})), {
      minutes: getCurrentTime(),
      isNow: true
    }].sort(compareByMinutes).filter((time: TimeWithMinutes) => {
      if (areRelevantFiltered || time.isNow) {
        return true
      }
      const itemMinutes = Number(time.minutes.replace(':', ''))
      const currentMinutes = Number(getCurrentTime().replace(':', ''))
      if (currentMinutes > itemMinutes && currentMinutes - itemMinutes <= MINUTES_GAP) {
        return true
      }
      if (currentMinutes < itemMinutes && itemMinutes - currentMinutes <= MINUTES_GAP * 2) {
        return true
      }
    })
  }

  return (
    <section className='flex flex-col gap-2 items-center'>
      <ul>
        {times.map(time => <li
          key={time.isNow ? 'now' : time.minutes}>{time.isNow ? 'Вы находитесь здесь' : time.minutes}</li>)}
      </ul>
      <fieldset className='flex gap-2'>
        <label className="label cursor-pointer flex gap-2">
          <span className="label-text">Выходной</span>
          <input type="checkbox" className="checkbox" checked={isDayOff} onChange={() => {
            setIsDayOff(!isDayOff)
          }}/>
        </label>
        <label className="label cursor-pointer flex gap-2">
          <span className="label-text">Показать все шаттлы</span>
          <input type="checkbox" className="checkbox" checked={areRelevantFiltered} onChange={() => {
            setAreRelevantFiltered(!areRelevantFiltered)
          }}/>
        </label>
      </fieldset>
    </section>
  );
};

export default Timetable;