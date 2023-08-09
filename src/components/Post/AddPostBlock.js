import styles from "./AddPostBlock.module.scss";
import classNames from "classnames/bind";
import { FormattedMessage } from "react-intl";
import ButtonRoundIcon from "../Tools/ButtonRoundIcon/ButtonRoundIcon";
import { CancelIcon } from "../../asset/icons";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);

function AddPostBlock({ setAddBlock, addBlockImg, setAddBlockImg }) {
	const closeAddPostBlock = () => {
		setAddBlockImg(false);
		setAddBlock(false);
	};
	const textAreaAdjust = (e) => {
		e.target.style.height = "40px";
		const height = e.target.scrollHeight;
		if (height > 0) {
			e.target.style.height = 4 + e.target.scrollHeight + "px";
		}
	};

	return (
		<>
			<div className={cx("wrapper")} onClick={closeAddPostBlock}>
				<div className={cx("block")} onClick={(e) => e.stopPropagation()}>
					<div className={cx("title")}>
						<span>
							<FormattedMessage id="Post_Comp.add_title" />
						</span>
						<ButtonRoundIcon
							className={"cancle"}
							icon={<CancelIcon width="24px" height="24px" />}
							butFunc={closeAddPostBlock}
						/>
					</div>
					<div className={cx("header")}>
						<div className={cx("header_avt")}></div>
						<div className={cx("header_name")}>
							<div className={cx("name_user-post")}>
								<span>Kusakari</span>
							</div>
							<div className={cx("time")}>
								<span>Just something special</span>
							</div>
						</div>
					</div>

					<div className={cx("content")}>
						<div className={cx("body")}>
							<div className={cx("input_content")}>
								<textarea
									onKeyUp={(e) => textAreaAdjust(e)}
									type="text"
									placeholder="Write something you wanna say in here!"
								/>
							</div>
							{addBlockImg && (
								<div className={cx("block_img")}>
									<div className={cx("background_input")}></div>
									<input type="file" title=" "/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddPostBlock;
