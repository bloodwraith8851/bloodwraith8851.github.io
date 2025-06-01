import React, { Component } from 'react';
import Clock from '../util components/clock';
import Status from '../util components/status';
import StatusCard from '../util components/status_card';
import DiscordStatus from '../util components/DiscordStatus'; // 👈 Added DiscordStatus

export default class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			status_card: false
		};
	}

	render() {
		return (
			<div className="main-navbar-vp absolute top-0 right-0 w-screen shadow-md flex flex-nowrap justify-between items-center bg-ub-grey text-ubt-grey text-sm select-none z-50 h-8">
				
				{/* Left: Activities + DiscordStatus (tight spacing) */}
				<div className="flex items-center space-x-1">
					<div
						tabIndex="0"
						className="pl-3 pr-2 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1"
					>
						Activities
					</div>
					<DiscordStatus /> {/* 👈 Positioned right next to Activities */}
				</div>

				{/* Middle: Clock */}
				<div
					tabIndex="0"
					className="pl-2 pr-2 text-xs md:text-sm outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1"
				>
					<Clock />
				</div>

				{/* Right: System Status Dropdown */}
				<div
					id="status-bar"
					tabIndex="0"
					onFocus={() => {
						this.setState({ status_card: true });
					}}
					className="relative pr-3 pl-3 outline-none transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange py-1"
				>
					<Status />
					<StatusCard
						shutDown={this.props.shutDown}
						lockScreen={this.props.lockScreen}
						visible={this.state.status_card}
						toggleVisible={() => {
							this.setState({ status_card: false });
						}}
					/>
				</div>
			</div>
		);
	}
}