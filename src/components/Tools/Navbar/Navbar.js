import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { HomeIcon,SettingIcon} from "../../../asset/icons";
import { NavLink, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import ToastifyUser from "../../pages/ListUser/toastUser";
import TippyCustom from "../../Tippy/index";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import { THEMES} from "../../../utils/constant";

import Search from "./Search";
import UserBar from "./UserBar";
// import { handleLogoutRedux, handleRefresh } from "../../redux/actions/userAction";
const cx = classNames.bind(styles);
function NavbarCustom() {
	const classes = cx("nav_item", cx("item"));

	const user = useSelector((state) => state.user.data_init);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		// dispatch(handleLogoutRedux());
		// toast.success("Logout Success");
		// navigate("/");
	};

	// useEffect(() => {
	// 	dispatch(handleRefresh());
	// }, []);

	// useEffect(() => {
	// 	if(user && user.auth === false && window.location.pathname !=='/login'){

	// 	}
	// },[user]);
	const currentTheme = useSelector((state) => state.app.theme);

	return (
		<div className={cx("container_block",currentTheme === THEMES.DARK && THEMES.DARK)}>
			<Search />
			<div className={cx("navbar")}>
				<TippyCustom content={<FormattedMessage id="Navbar.home"/>}>
					<div className={classes}>
						<NavLink to="/" className={(nav) => cx("menu_item", { active: nav.isActive })}>
							<HomeIcon />
						</NavLink>
					</div>
				</TippyCustom>
				<TippyCustom content={<FormattedMessage id="Navbar.settings"/>}>
					<div className={classes}>
						<NavLink to="/edit" className={(nav) => cx("menu_item", { active: nav.isActive })}>
							<SettingIcon />
						</NavLink>
					</div>
				</TippyCustom>
				<TippyCustom content="List User">
					<div className={classes}>
						<NavLink
							to="/list"
							className={(nav) => cx("menu_item", { active: nav.isActive })}
						>
							 
						</NavLink>
					</div>
				</TippyCustom>

			</div>
			<UserBar />
		</div>
	);
}

export default NavbarCustom;