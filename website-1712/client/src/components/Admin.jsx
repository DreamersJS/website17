import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userAtom";
import { fetchUsers, updateUserRole, updateIsBlocked } from "../service/service-user";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "./hoc/ResponsiveComponent";
import { useFilterSearchSort } from "../hooks/useFilterSearchSort";
import SearchToolBar from "./SearchToolbar";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const user = useRecoilValue(userState);
  const isAdmin = user?.role === "ADMIN";
  const { width } = useScreenSize();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const isMobile = width <= 600;
  const [selectedRole, setSelectedRole] = useState('');
  const [sortOption, setSortOption] = useState('');
  const DEFAULT_VISIBLE_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);
  const navigate = useNavigate();

  const filteredUsers = useFilterSearchSort({
    items: users,
    searchQuery: search,
    searchKeys: ['username', 'email'],
    categoryKey: 'role', // works as category here
    selectedCategory: selectedRole,
    sortKeys: [
      sortOption === 'name-asc' && { key: 'username', order: 'asc' },
      sortOption === 'name-desc' && { key: 'username', order: 'desc' },
      sortOption === 'created-desc' && { key: 'createdAt', order: 'desc' },
    ].filter(Boolean),
  });
  const rowsPerPageOptions = [10, 20];

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleFetchUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      handleFetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const toggleIsBlocked = async (userId) => {
    try {
      await updateIsBlocked(userId);
      handleFetchUsers();
    } catch (error) {
      console.error("Error updating block status:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setVisibleCount(value);
    setPage(0);
  };


  return (
    <>
      <SearchToolBar
        entityName="Users"
        searchTerm={search}
        onSearchChange={setSearch}
        selectedCategory={selectedRole}
        onCategoryChange={setSelectedRole}
        categoryOptions={['admin', 'user', 'coach']}
        sortOption={sortOption}
        onSortChange={setSortOption}
        sortOptions={[
          { label: 'Name (A-Z)', value: 'name-asc' },
          { label: 'Name (Z-A)', value: 'name-desc' },
          { label: 'Newest', value: 'created-desc' },
        ]}
        visibleCount={visibleCount}
        onVisibleCountChange={setVisibleCount}
        showCountOptions={rowsPerPageOptions}
        totalCount={filteredUsers.length}
      />

      {!isMobile ? (
        <div className="flex flex-col items-center justify-center w-full h-full my-2">
          {isAdmin ? (
            <ResponsiveComponent>
              {({ width }) => (
                <Paper sx={{ width: '100%', padding: width > 600 ? 3 : 1 }}>
                  <h2>Welcome, Admin {user.username}</h2>

                  {/* table */}
                  <TableContainer>
                    <Table size={width > 600 ? "medium" : "small"}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Username
                          </TableCell>
                          <TableCell>
                            Email
                          </TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredUsers
                          .slice(page * visibleCount, page * visibleCount + visibleCount)
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <select
                                  value={user.role.toLowerCase()}
                                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                  <option value="user">User</option>
                                  <option value="coach">Coach</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </TableCell>
                              <TableCell>{user.isBlocked ? "Blocked" : "Active"}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color={user.isBlocked ? "warning" : "success"}
                                  onClick={() => toggleIsBlocked(user.id)}
                                >
                                  {user.isBlocked ? "Unblock" : "Block"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={visibleCount}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              )}
            </ResponsiveComponent>
          ) : (
            <h3>You don't have permission to access this page.</h3>
          )}
        </div>)
        :
        (<div className="mt-2">
          {filteredUsers
            .slice(page * visibleCount, page * visibleCount + visibleCount)
            .map((user) => (
              <Paper key={user.id} sx={{ p: 2, mb: 2 }}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong>
                  <select
                    value={user.role.toLowerCase()}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="coach">Coach</option>
                    <option value="admin">Admin</option>
                  </select>
                </p>
                <p><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</p>
                <Button
                  variant="contained"
                  color={user.isBlocked ? "warning" : "success"}
                  onClick={() => toggleIsBlocked(user.id)}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </Paper>
            ))}
        </div>
        )}
    </>
  );
};

export default Admin;
