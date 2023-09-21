import styles from "./ProfileLayout.module.scss";
import classNames from "classnames/bind";
import NavbarCustom from "../../Tools/Navbar/Navbar";
import { useEffect, useState } from "react";
import { userService } from "../../../services";

import { EditInfor, PlusIcon } from "../../../asset/icons";
import { FormattedMessage } from "react-intl";
import { THEMES } from "../../../utils/constant";
import { useSelector } from "react-redux";
import FriendBlock from "./FriendBlock";
import { NavLink, Link, useParams } from "react-router-dom";

// import { THEMES } from "../../../utils/constant";
// const currentTheme = useSelector((state) => state.app.theme);

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
	const idUser = useSelector((state) => state.user.userId);

	// const params = useParams();
	const [res, setRes] = useState({});
	const [friend, setFriend] = useState({});
    const idFriend = useParams();
	// console.log(idFriend.idUser);
    useEffect(() => {
		async function fetchData() {
			const response = await userService.handleGetDataUserService(idFriend.idUser);
			setRes(response);
			const resFriend = await userService.handleGetAllFriendService(idFriend.idUser);
			if (resFriend && resFriend.EC === 0) {
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
	const currentTheme = useSelector((state) => state.app.theme);
	return (
		<div className={cx("wrapper")}>
			<NavbarCustom />

			<div className={cx("container")}>
				<div className={cx("content")}>
					<div className={cx("all", currentTheme === THEMES.DARK && THEMES.DARK)}>
						<div className={cx("banner")}>
							<div className={cx("cover")}>
								<div className={cx("cover_img")}>
									<img
										src="https://wallpaperaccess.com/full/4495015.jpg"
										alt="Cover"
									/>
								</div>
							</div>
							<div className={cx("profile_header")}>
								<div className={cx("profile_cover")}>
									<div className={cx("profile_image")}>
										{(res !== {} && res.reg && res.reg.avatar && (
											<img src={res.reg.avatar} alt="Image" />
										)) || (
											<img
												src="https://wallpaperaccess.com/full/4495015.jpg"
												alt="Avatar_User"
											/>
										)}
									</div>
									<div className={cx("profile_details")}>
										<div className={cx("profile_name")}>
											{(res !== {} && res.reg && res.reg.userName && (
												<p>{res.reg.userName}</p>
											)) || <p>Trần Minh Nhật Hoàng</p>}
										</div>
										<div className={cx("profile_friend")}>
											<p className={cx("profile_friend-num")}>
												{friend.length} friends
											</p>
											<div className={cx("profile_friend-cover")}>
												{friend.length > 0 &&
													friend
														.slice(0, 2)
														.map((bro, index) => (
															<FriendBlock
																key={Math.random()}
																data={bro}
																index={index}
                                                                idFriend = {idFriend.idUser}
															/>
														))}
											</div>
										</div>
									</div>
									<div className={cx("profile_action")}>
										<div className={cx("action", "add")}>
											<div className={cx("action_icon")}>
												<PlusIcon />
											</div>
											<div className={cx("action_title")}>
												<FormattedMessage id="Profile_Page.add-story" />
											</div>
										</div>
										<div className={cx("action")}>
											<div className={cx("action_icon")}>
												<EditInfor />
											</div>
											<div className={cx("action_title")}>
												<FormattedMessage id="Profile_Page.edit-profile-pic" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={cx("content_bar")}>
								<div className={cx("bar_cover")}>
									<NavLink
										to={`/${idFriend.idUser}`}
										// className={cx("bar_item", "bar_item-active")}
										className={(nav) =>
											cx("bar_item", { "bar_item-active": nav.isActive })
										}
                                        // exact
                                        end
									>
										<FormattedMessage id="Profile_Page.about" />
									</NavLink>
									<NavLink className={cx("bar_item")}>
										<FormattedMessage id="Profile_Page.post" />
									</NavLink>
									<NavLink
										to={`/${idFriend.idUser}/friend`}
										className={(nav) =>
											cx("bar_item", { "bar_item-active": nav.isActive })
										}
                                        // exact
                                        end
									>
										<FormattedMessage id="Profile_Page.friends" />
									</NavLink>
									<NavLink className={cx("bar_item")}>
										<FormattedMessage id="Profile_Page.photos" />
									</NavLink>
								</div>
							</div>
						</div>
						<div className={cx("body")}>{children}</div>
					</div>
					
				</div>
			</div>
		</div>
	);
}

export default ProfileLayout;
