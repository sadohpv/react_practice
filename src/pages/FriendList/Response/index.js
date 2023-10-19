import { useEffect, useState } from "react";
import { userService } from "../../../services";
import styles from "./Response.module.scss";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";

import { emitter } from "../../../utils/emitter";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { THEMES } from "../../../utils/constant";
import FriendBlock from "../../../components/Layout/ProfileLayout/FriendBlock";
import CompCard from "../CompCard";

const cx = classNames.bind(styles);

function FriendResponsePage() {
	const userId = useSelector((state) => state.user.userId);

	const [res, setRes] = useState({});
	const [friend, setFriend] = useState({});
	const [numFriend, setNumFriend] = useState(0);

	const currentTheme = useSelector((state) => state.app.theme);

	const idFriend = useParams();
	useEffect(() => {
		async function fetchData() {
			const resFriend = await userService.handleGetAllFriendService(idFriend.idUser);

			if (resFriend && resFriend.EC === 0) {
				setNumFriend(resFriend.reg.length);

				if (resFriend.reg.length > 5) {
					setFriend(resFriend.reg.slice(0, 4));
				} else {
					// console.log(res)
					setFriend(resFriend.reg);
				}
			}
		}
		fetchData();
	}, []);

	return (
		<div className={cx("container", currentTheme === THEMES.DARK && THEMES.DARK)}>
			
			<CompCard />
			<CompCard />


			<CompCard />
			<CompCard />
			<CompCard />
		</div>
	);
}

export default FriendResponsePage;