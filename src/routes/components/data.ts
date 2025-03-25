interface Activity {
    name: string,
    image: string,
}

function getTimeBlocks(weekday: boolean, hour: number) {
    let timeBlocks: Date[] = []
    let minute: number = 0
    if (weekday) {
        minute = 30
    }
    for (let i = 0; i < 6; i++) {
        if (minute == 60) {
            minute = 0
            hour += 1;
        }
        let activityTimeBlock = new Date()
        activityTimeBlock.setHours(hour, minute, 0, 0)
        timeBlocks.push(activityTimeBlock)
        if (i == 1) {
            minute += 15
        }
        else if (i == 4) {
            minute += 15
        }
        else {
            minute += 10
        }
    }
    return timeBlocks
}

function getSeniorTimeBlocks(weekday: boolean, hour: number, numberOfActivities: number) {
    let timeBlocks: Date[] = []
    let minute: number = 0
    if (weekday) {
        minute = 30
    }
    for (let i = 0; i < numberOfActivities + 1; i++) {
        if (minute == 60) {
            minute = 0
            hour += 1;
        }
        let activityTimeBlock = new Date()
        activityTimeBlock.setHours(hour, minute, 0, 0)
        timeBlocks.push(activityTimeBlock)
        if (i == numberOfActivities - 2) {
            minute += 40
        }
        else {
            minute += 10
        }
    }
    return timeBlocks
}

export const firstHourTimeBlocks = new Date().getDay() == 6 ? getTimeBlocks(false, 10) : getTimeBlocks(true, 15)
export const secondHourTimeBlocks = new Date().getDay() == 6 ? getTimeBlocks(false, 11) : getTimeBlocks(true, 16)
export const thirdHourTimeBlocks = new Date().getDay() == 6 ? getTimeBlocks(false, 12) : getTimeBlocks(true, 17)
export const lastHourTimeBlocks = new Date().getDay() == 6 ? getTimeBlocks(false, 13) : getTimeBlocks(true, 18)

export const activities: Activity[] = [
    {
        name: "Typing",
        image: "keyboard.svg"
    },
    {
        name: "CodeSpark",
        image: "code-spark.svg"
    },
    {
        name: "Mouse Games",
        image: "mouse-games.svg"
    },
    {
        name: "Code.org",
        image: "code.svg"
    },
    {
        name: "Free Time",
        image: "free-time.svg"
    },
]

export const seniorActivities: Activity[] = [
    {
        name: "Typing",
        image: "keyboard.svg"
    },
    {
        name: "Impact",
        image: "code.svg"
    },
    {
        name: "Exploration",
        image: "free-time.svg"
    },
]

export const seniorFirstHourTimeBlocks = new Date().getDay() == 6 ? getSeniorTimeBlocks(false, 10, seniorActivities.length) : getSeniorTimeBlocks(true, 15, seniorActivities.length)
export const seniorSecondHourTimeBlocks = new Date().getDay() == 6 ? getSeniorTimeBlocks(false, 11, seniorActivities.length) : getSeniorTimeBlocks(true, 16, seniorActivities.length)
export const seniorThirdHourTimeBlocks = new Date().getDay() == 6 ? getSeniorTimeBlocks(false, 12, seniorActivities.length) : getSeniorTimeBlocks(true, 17, seniorActivities.length)
export const seniorLastHourTimeBlocks = new Date().getDay() == 6 ? getSeniorTimeBlocks(false, 13, seniorActivities.length) : getSeniorTimeBlocks(true, 18, seniorActivities.length)