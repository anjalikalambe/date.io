import React, { useState, useEffect } from "react";
import openRoomIcon from "../../../../Assets/MeetingRoomAssets/openRoomIcon.png";
import personIcon from "../../../../Assets/MeetingRoomAssets/personIcon.png";
import joinIcon from "../../../../Assets/MeetingRoomAssets/joinIcon.png";
import openDoor from "../../../../Assets/MeetingRoomAssets/openDoor.png";
import closedDoor from "../../../../Assets/MeetingRoomAssets/closedDoor.png";

import "./OpenRooms.css";
import RoomInfo from "./RoomInfo/RoomInfo";

const OpenRooms = () => {
	const [rooms, setRooms] = useState([]);
	const [roomInfo, setRoomInfo] = useState({});
	const [showRoom, setShowRoom] = useState(false);
	const [profile, setProfile] = useState([]);

	useEffect(() => {
		fetch("/rooms")
			.then((res) => res.json())
			.then((room) => setRooms([...room]));
	}, []);

	const roomClickAction = (room) => {
		setRoomInfo(room);
		setShowRoom(true);
		setProfile(room.participants.slice(0, 3));
	};

	return (
		<div className="openRooms__section">
			<div className="openRooms__header">
				<img src={openRoomIcon} alt="" />
				<h3>Open Rooms</h3>
			</div>
			<div className="openRooms__roomList">
				{rooms.map((room) => {
					return (
						<div
							className="room__info"
							onClick={() => {
								roomClickAction(room);
							}}
						>
							<div className="roomName__box">
								<p>{room.roomName}</p>
							</div>

							<div className="participantAmount">
								<img className="personIcon" src={personIcon} />
								<p>{room.members}</p>
							</div>
							<div className="roomStatus">
								<img
									src={
										room.joinStatus ? openDoor : closedDoor
									}
									alt=""
								/>
								<p>{room.joinStatus ? "Open" : "Closed"}</p>
							</div>
							<div className="openRoomStatus">
								{/* {profile &&
									profile.map((participant) => {
										return (
											<img
												className="participant__img"
												src={participant.profileurl}
											/>
										);
									})} */}
							</div>

							<div className="joinRoom__button">
								<h5>Join Room</h5>
								<img src={joinIcon} alt="" />
							</div>
						</div>
					);
				})}
			</div>
			{showRoom && <RoomInfo roomInfo={roomInfo} />}
		</div>
	);
};

export default OpenRooms;