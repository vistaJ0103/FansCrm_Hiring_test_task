import { userService } from "@/services/user.service";
import { updateUserList } from "@/store/userlist";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "@/store/userlist";
import { IUser } from "@/types";
import router from "next/router";
import { toastNotification } from "../Notification";
import { Pagination } from "antd";

const Table = () => {
  const dispatch = useDispatch();
  const [subAllUsers, setSubAllUsers] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);

  useEffect(() => {
    const getAllUsers = async () => {
      return await userService.getAll();
    };
    getAllUsers()
      .then((userData: IUser[]) => {
        if (userData) {
          dispatch(updateUserList(userData));
          setSubAllUsers(userData);
        }
      })
      .catch(() => {
        return;
      });
  }, []);

  const userInfo = async (id: number) => {
    console.log("id", id);
    const userData = await userService.getUserById(id);
    console.log("userdata", userData);
    if (userData) {
      router.push({
        pathname: "/user",
        query: { id: userData.id, name: userData.name, email: userData.email, phonenumber: userData.phonenumber },
      });
    } else {
      return;
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = subAllUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="rounded-sm border px-5 pt-6 pb-2.5 shadow-default border-strokedark bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full ">
        <table className="w-full table-auto">
          <thead>
            <tr className=" text-left bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium  text-white">
                NO
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium  text-white ">
                User
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium  text-white">
                Email Address
              </th>

              <th className="py-4 px-4 font-medium  text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((subAllUser: IUser, key: number) => (
              <tr key={key}>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <p className="text-white">{key + 1}</p>
                </td>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <p className="text-white">{subAllUser.name}</p>
                </td>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <p className="text-white">{subAllUser.email}</p>
                </td>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => userInfo(subAllUser.id)}
                    >
                      {/* <Link href={`/settings?id=${subAllUser._id}`}> */}
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                      {/* </Link> */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="mt-6"
          current={currentPage}
          pageSize={usersPerPage}
          total={subAllUsers.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
