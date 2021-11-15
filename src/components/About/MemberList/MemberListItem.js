import React from "react";
import {
  Avatar,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Facebook, LinkedIn } from "@material-ui/icons";

const MemberListItem = ({ member }) => {
  const { name, image, facebookUrl, linkedinUrl } = member;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={name} src={image} />
      </ListItemAvatar>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <Link
          target="_blank"
          rel="noreferrer noopener"
          component={IconButton}
          href={facebookUrl}
        >
          <Facebook />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer noopener"
          component={IconButton}
          href={linkedinUrl}
        >
          <LinkedIn />
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default MemberListItem;
