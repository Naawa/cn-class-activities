<script lang="ts">
	import { onDestroy } from "svelte";

	let minutes = 0;
	let seconds = 0;

	const tick = () => {
		const now = new Date();
		const nextHour = new Date(now);
		nextHour.setHours(now.getHours() + 1, 0, 0, 0);

		const diff = nextHour.getTime() - now.getTime();

		minutes = Math.floor(diff / 1000 / 60);
		seconds = Math.floor((diff / 1000) % 60);
	};

	tick();
	const interval = setInterval(tick, 1000);
	onDestroy(() => clearInterval(interval));
</script>

<div class="timer-wrapper">
	<h3 class="title">Session Timer</h3>

	<div class="countdown">
		<div class="group">
			<span class="num">{minutes}</span>
			<span class="label">Min</span>
		</div>

		<div class="spacer"></div>

		<div class="group">
			<span class="num">{seconds}</span>
			<span class="label">Sec</span>
		</div>
	</div>
</div>

<style>
	.timer-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		font-family: 'Azo Sans Black';
		margin: 1em;
		margin-top: 2em;
	}

	.title {
		margin-bottom: 0.5em;
		font-size: 1.6rem;
		font-weight: 900;
	}

	.countdown {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 2rem;
	}

	.group {
		display: flex;
		align-items: baseline;
		gap: 0.3rem;
	}

	.num {
		font-size: 4rem;
		font-weight: 700;
		line-height: 1;
	}

	.label {
		font-size: 1.8rem;
		font-weight: 900;
		opacity: 0.9;
	}
	* {
		font-family: 'Azo Sans Black';
	}
</style>
