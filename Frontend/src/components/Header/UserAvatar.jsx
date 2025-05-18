import React from 'react';
import { Image } from 'react-bootstrap';

const getInitials = (name, surname) => {
  const first = name?.charAt(0).toUpperCase() || '';
  const last = surname?.charAt(0).toUpperCase() || '';
  return first + last;
};

const UserAvatar = ({ user, size = 30 }) => {
  const initials = getInitials(user.name, user.surname);

  if (user.avatar) {
    return (
      <Image
        src={user.avatar}
        roundedCircle
        height={size}
        alt="Avatar"
      />
    );
  }

  const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];
  const bg = colors[(user.name.charCodeAt(0) + user.surname.charCodeAt(0)) % colors.length];

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2.2,
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
