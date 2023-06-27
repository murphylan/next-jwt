
"use client"

import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import {
  Loading
} from '@carbon/react';

const ListPage: React.FC = () => {
  const { data, loading } = useContext(AuthenticationContext);
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      {loading ?

        <Loading className="" small={false} withOverlay={false} />

        : (
          data ?
            <div className="font-mono text-7xl text-violet-600">{data.email}</div>
            : (
              <div className="font-mono text-7xl text-red-500">未登陆</div>
            )
        )}
    </div>
  )
}

export default ListPage;
