<script lang="ts">
	import { onDestroy } from "svelte";

	let minutes = 0;
	let seconds = 0;

	function tick() {
		const now = new Date();
		const next = new Date(now);
		const day = now.getDay(); // 0 = Sunday, 6 = Saturday

		// Weekend: always count down to next full hour (hh:00 -> hh+1:00)
		if (day === 0 || day === 6) {
			next.setHours(now.getHours() + 1, 0, 0, 0);
		} else {
			// Weekday: cycles anchored at :30
			// 3:30 → 4:30, 4:30 → 5:30, etc.
			if (now.getMinutes() < 30) {
				// From hh:00–hh:29 → up to hh:30
				next.setMinutes(30, 0, 0);
			} else {
				// From hh:30–hh:59 → up to (hh+1):30
				next.setHours(now.getHours() + 1, 30, 0, 0);
			}
		}

		const diff = next.getTime() - now.getTime();
		minutes = Math.floor(diff / 1000 / 60);
		seconds = Math.floor((diff / 1000) % 60);
	}

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

		<div class="group">
			<span class="num">{seconds < 10 ? `0${seconds}` : seconds}</span>
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
		margin: 1em;
		margin-top: 2em;
	}

	.title {
		font-size: 1.6rem;
	}

	.countdown {
		display: flex;
		gap: 2rem;
		align-items: baseline;
	}

	.num {
		font-size: 3rem;
		font-weight: 700;
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