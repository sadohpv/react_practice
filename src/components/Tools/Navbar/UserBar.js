import styles from "./UserBar.module.scss";
import classNames from "classnames/bind";
import { BellNotifyFullIcon, BellNotifyIcon, HomeIcon, SettingIcon } from "../../../asset/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ToastifyUser from "../../pages/ListUser/toastUser";
import TippyCustom from "../../Tippy/index";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import { THEMES } from "../../../utils/constant";
import ButtonRoundIcon from "../ButtonRoundIcon/ButtonRoundIcon";
import { LogoutIcon } from "../../../asset/icons";
import NotifyBox from "../NotifyBox";
// import { handleLogoutRedux, handleRefresh } from "../../redux/actions/userAction";
const cx = classNames.bind(styles);
function UserBar() {
	const classes = cx("nav_item", cx("item"));

	const user = useSelector((state) => state.user.data_init);
	const [notifyIcon, setNotifyIcon] = useState(false);
	const [notifyAnimation, setNotifyAnimation] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		// dispatch(handleLogoutRedux());
		// toast.success("Logout Success");
		// navigate("/");
		alert("Logout");
	};
	const handleOpenNoTiFy = () => {
		if (notifyIcon === true) {
			setNotifyAnimation(true);
		} else {
			setNotifyAnimation(false);
		}
		setTimeout(() => {
			setNotifyIcon(!notifyIcon);
		}, 600);
	};
	// useEffect(() => {
	// 	dispatch(handleRefresh());
	// }, []);

	const currentTheme = useSelector((state) => state.app.theme);

	return (
		<>
			<div className={cx("wrapper", currentTheme === THEMES.DARK && THEMES.DARK)}>
				<ButtonRoundIcon
					icon={
						notifyIcon === false ? (
							<BellNotifyIcon height="16px" width="16px" />
						) : (
							<span className={cx("active")}>
								<BellNotifyFullIcon height="16px" width="16px" />
							</span>
						)
					}
					className={cx("button_logout")}
					butFunc={handleOpenNoTiFy}
				/>
				<ButtonRoundIcon
					icon={<LogoutIcon height="16px" width="16px" />}
					className={cx("button_logout")}
					butFunc={handleLogout}
				/>
			</div>
			{notifyIcon && <NotifyBox key={Math.random()} out={notifyAnimation} />}
		</>
	);
}

export default UserBar;
