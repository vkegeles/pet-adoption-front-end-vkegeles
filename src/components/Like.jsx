import React from "react";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

import { IconButton } from "@material-ui/core";

export default function Like({ onClick, isFavorite }) {
  return (
    <>
      <IconButton
        aria-label="favorite"
        component="span"
        onClick={onClick}
        className="like"
      >
        {!isFavorite && <FavoriteBorderOutlinedIcon fontSize="large" />}
        {isFavorite && <FavoriteOutlinedIcon fontSize="large" />}
      </IconButton>
    </>
  );
}
