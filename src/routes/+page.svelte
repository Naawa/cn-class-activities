<script lang="ts">
	import Activity from './components/Activity.svelte';
	import Clock from './components/Clock.svelte';
	import {
		activities,
		firstHourTimeBlocks,
		secondHourTimeBlocks,
		thirdHourTimeBlocks,
		lastHourTimeBlocks,
		seniorFirstHourTimeBlocks,
		seniorSecondHourTimeBlocks,
		seniorThirdHourTimeBlocks,
		seniorLastHourTimeBlocks,
		seniorActivities
	} from './components/data';

	let now: Date = $state(new Date());
	let startTime: Date = firstHourTimeBlocks[0];
	let endTime: Date = lastHourTimeBlocks[lastHourTimeBlocks.length - 1];
	endTime.setHours(lastHourTimeBlocks[0].getHours() + 1, lastHourTimeBlocks[0].getMinutes(), 0, 0);

	let seniorEndTime: Date = seniorLastHourTimeBlocks[seniorLastHourTimeBlocks.length - 1];
	seniorEndTime.setHours(
		seniorLastHourTimeBlocks[0].getHours() + 1,
		seniorLastHourTimeBlocks[0].getMinutes(),
		0,
		0
	);

	let timeBlocks: Date[] = $state(lastHourTimeBlocks);
	let seniorTimeblocks: Date[] = $state(seniorLastHourTimeBlocks);

	function setHour(): Date[] {
		let timeblocks: Date[];

		if (now.getTime() < secondHourTimeBlocks[0].getTime()) {
			timeblocks = firstHourTimeBlocks;
		} else if (now.getTime() < thirdHourTimeBlocks[0].getTime()) {
			timeblocks = secondHourTimeBlocks;
		} else if (now.getTime() < lastHourTimeBlocks[0].getTime()) {
			timeblocks = thirdHourTimeBlocks;
		} else if (now.getTime() < endTime.getTime()) {
			timeblocks = lastHourTimeBlocks;
		} else {
			timeblocks = firstHourTimeBlocks;
		}
		return timeblocks;
	}

	function setSeniorHour(): Date[] {
		let seniorTimeblocks: Date[];

		if (now.getTime() < seniorSecondHourTimeBlocks[0].getTime()) {
			seniorTimeblocks = seniorFirstHourTimeBlocks;
		} else if (now.getTime() < seniorThirdHourTimeBlocks[0].getTime()) {
			seniorTimeblocks = seniorSecondHourTimeBlocks;
		} else if (now.getTime() < seniorLastHourTimeBlocks[0].getTime()) {
			seniorTimeblocks = seniorThirdHourTimeBlocks;
		} else if (now.getTime() < seniorEndTime.getTime()) {
			seniorTimeblocks = seniorLastHourTimeBlocks;
		} else {
			seniorTimeblocks = seniorFirstHourTimeBlocks;
		}
		return seniorTimeblocks;
	}

	function hourStart(now: Date, startTime: Date, endTime: Date): boolean {
		if (now > startTime && now < endTime) {
			return true;
		} else {
			return false;
		}
	}

	function updateTime(): void {
		now = new Date();
		timeBlocks = setHour();
		seniorTimeblocks = setSeniorHour();
		setTimeout(updateTime, 1);
	}
	updateTime();
</script>

<Clock
	time={now.toLocaleTimeString('en-US', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit'
	})}
></Clock>
<section>
	<div>
		<h1>Junior Activites</h1>
		<br />
		<span class="jr-divider"></span>
		{#each activities as activity, i}
			<Activity
				{now}
				name={activity.name}
				start={timeBlocks[i]}
				end={timeBlocks[i + 1]}
				image={activity.image}
				junior={true}
			></Activity>
			<span class="jr-divider"></span>
		{/each}
		<br />
	</div>
	<div>
		<h1>Create Activites</h1>
		<br />
		<span></span>
		{#each seniorActivities as activity, i}
			<Activity
				{now}
				name={activity.name}
				start={seniorTimeblocks[i]}
				end={seniorTimeblocks[i + 1]}
				image={activity.image}
				junior={false}
			></Activity>
			<span></span>
		{/each}
		<br />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: stretch;
		padding: 0;
		width: 100svw;
		gap: 4em;
		min-height: calc(100svh - 12em);
		position: relative;
	}

	div {
		width: fit-content;
		background-color: #fff4ff;
		border-radius: 0.75em;
		color: #a839b9;
		border: solid 0.3em #a839b9;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2em;
		flex-direction: column;
	}
	div:last-of-type {
		background-color: #f4f7ff;
		border: solid 0.3em #1376bd;
		color: #1376bd;
	}

	span {
		width: 95%;
		height: 0.2em;
		background-color: #1376bd20;
		border-radius: 1em;
	}

	.jr-divider {
		width: 95%;
		height: 0.2em;
		background-color: #a839b920;
		border-radius: 1em;
	}
</style>
