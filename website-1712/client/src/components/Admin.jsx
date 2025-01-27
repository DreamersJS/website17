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

const Admin = () => {
  const user = useRecoilValue(userState);
  const isAdmin = user?.role === "ADMIN";
  

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");

  useEffect(() => {
    fetchUsers();
  }, []);
console.log(users.map(user => user.role));
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/all");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    // Handle role change API request
    try {
      await fetch(`/api/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const toggleIsBlocked = async (userId) => {
    // Handle block/unblock API request
    try {
      await fetch(`/api/users/${userId}/block`, {
        method: "POST",
      });
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error updating block status:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    )
    .sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="
    flex flex-col items-center justify-center w-full h-full my-2
    ">
      {isAdmin ? (
        <Paper>
          <h2>Welcome, Admin {user.username}</h2>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "username"}
                      direction={order}
                      onClick={() => handleSort("username")}
                    >
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "email"}
                      direction={order}
                      onClick={() => handleSort("email")}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <select
                          value={user.role.toLowerCase()}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                        >
                          <option value="user">User</option>
                          <option value="coach">Coach</option>
                          <option value="admin">Admin</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
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
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <h3>You don't have permission to access this page.</h3>
      )}
    </div>
  );
};

export default Admin;
