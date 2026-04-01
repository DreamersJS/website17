// import { vi  } from 'vitest';
// import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
// import Register from "../../src/components/auth/Register";
// import { registerUser, validateForm,  } from "../../src/service/service-user";
// import { MemoryRouter } from 'react-router-dom';
// import { RecoilRoot } from 'recoil'; 


// /*
// MemoryRouter otherwise you will get useNavigate error:
// */
// const renderWithProviders = (ui) => {
//     return render(
//         <RecoilRoot>
//             <MemoryRouter>{ui}</MemoryRouter>
//         </RecoilRoot>
//     );
// };
// // renderWithProviders(<Register />);

// global.fetch = vi.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve({ success: true }),
//     })
// );

// // Mocking validateForm directly if it's imported in the component
// vi.mock('../../service/service-user.js', () => ({
//     validateForm: vi.fn(() => 'Validation error: Username must be at least 3 characters long'),
//     registerUser: vi.fn(() => Promise.resolve({ id: 1, username: 'testuser' })),
// }));

// describe('Register Component', () => {

//     afterEach(() => {
//         vi.restoreAllMocks(); // Restore all mocked functions after each test
//     });

//     it('renders the register form', () => {
//         render(
//             <MemoryRouter>
//                 <Register />
//             </MemoryRouter>
//         );

//         // Check for register heading
//         expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();

//         // Check for form fields
//         expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

//         // check for register button
//         expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
//     });

//     it('shows error when required fields are not filled', async () => {
//         // const mockError = 'Validation error: Fields are required';
//         // const mockValidateForm = vi.fn(() => 'Validation error: Fields are required');
//         // const mockRegisterUser = vi.fn();
//         // const mockNavigate = vi.fn();
//         // const mockSetUser = vi.fn();
//         const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });


//         // Mock console.error
//         // vi.spyOn(console, 'error').mockImplementation(() => {});

//         render(
//             <MemoryRouter>
//                 <Register />
//             </MemoryRouter>
//         );

//         // Trigger the form submit without filling in the fields
//         // fireEvent.click(screen.getByRole('button', { name: /register/i }));
//         await act(async () => {
//             fireEvent.click(screen.getByRole('button', { name: /register/i }));
//         });
  
//         // Check if console.error was called with the validation error
//         // expect(console.error).toHaveBeenCalledWith('Validation error:', mockError);
//         // expect(console.error).toHaveBeenCalledWith('Validation error:', expect.any(String));
//         // expect(mockValidateForm).toHaveBeenCalled();  // Ensure the validation function is called
//         // expect(mockRegisterUser).not.toHaveBeenCalled();   
//         // expect(console.error).toHaveBeenCalledWith('Validation error:', 'Validation error: Fields are required');  // Check the logged error
//         // // Ensure validateForm was called
//         // expect(require('../../src/service/service-user.js').validateForm).toHaveBeenCalled();

//         // // Ensure registerUser was not called
//         // expect(require('../../src/service/service-user.js').registerUser).not.toHaveBeenCalled();

//         // Verify that the validation error is logged to the console
//         expect(validateForm).toHaveBeenCalled();  
//         expect(validateForm).toHaveReturnedWith('Validation error');
//         expect(registerUser).not.toHaveBeenCalled(); 
//         // expect(registerUser).toHaveBeenCalledWith({
//         //     username: 'testuser',
//         //     email: 'test@domain.com',
//         //     password: 'password123',
//         // });        
//         // expect(consoleErrorSpy).toHaveBeenCalledWith(
//         //     'Validation error:',
//         //     " Username must be at least 3 characters long."
//         // );
//         expect(consoleErrorSpy).toHaveBeenCalled();

//         // Restore console.error
//         consoleErrorSpy.mockRestore();

//         // Restore the mock
//         // spy.mockClear();
//         // console.error.mockRestore();
//         vi.restoreAllMocks();
//     });


//     it('does not submit form if validation fails', async () => {
//         const mockValidateForm = vi.fn().mockReturnValue('Validation error');
//         render(
//             <MemoryRouter>
//                 <Register />
//             </MemoryRouter>
//         );

//         await act(async () => {
//             fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
//             const form = screen.getByRole('form');
//             fireEvent.submit(form);
//         });

// await waitFor(() => {
//         expect(mockValidateForm).toHaveBeenCalled();
//         expect(mockValidateForm).toHaveReturnedWith('Validation error');
//         });
//     });

//     it('displays loading state during form submission', async () => {
        
//         render(
//             <MemoryRouter>
//                 <Register />
//             </MemoryRouter>
//         );

//         await act(async () => {
//             fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
//             fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@domain.com' } });
//             fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

//             const form = screen.getByRole('form');
//             fireEvent.submit(form);
//         });


// await waitFor(() => {
//         expect(screen.getByRole('button')).toBeDisabled();
//         expect(screen.getByText(/registering.../i)).toBeInTheDocument();
//          });
//     });

//     // it('redirects to the home page after successful registration', async () => {
//     //     const mockRegisterUser = vi.fn().mockResolvedValue({
//     //         user: { id: 1, username: 'testuser', email: 'test@domain.com', photo: '', role: 'user', coachId: null }
//     //     });
//     //     const mockSetUser = vi.fn();
//     //     const mockNavigate = vi.fn();

//     //     render(
//     //         <MemoryRouter>
//     //             <Register />
//     //         </MemoryRouter>
//     //     );

//     //     await act(async () => {
//     //         fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
//     //         fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@domain.com' } });
//     //         fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

//     //         const form = screen.getByRole('form');
//     //         fireEvent.submit(form);
//     //     });

//     //     await waitFor(() => {
//     //         expect(mockRegisterUser).toHaveBeenCalled();
//     //         expect(mockSetUser).toHaveBeenCalled();
//     //         expect(mockNavigate).toHaveBeenCalledWith('/');
//     //     });
//     // });

//     // it('updates user state after successful registration', async () => {
//     //     const mockRegisterUser = vi.fn().mockResolvedValue({
//     //         user: { id: 1, username: 'testuser', email: 'test@domain.com', photo: '', role: 'user', coachId: null }
//     //     });
//     //     const mockSetUser = vi.fn();

//     //     render(
//     //         <RecoilRoot>
//     //             <MemoryRouter>
//     //                 <Register />
//     //             </MemoryRouter>
//     //         </RecoilRoot>
//     //     );

//     //     await act(async () => {
//     //         fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
//     //         fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@domain.com' } });
//     //         fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

//     //         const form = screen.getByRole('form');
//     //         fireEvent.submit(form);
//     //     });

//     //     await waitFor(() => {
//     //         expect(mockSetUser).toHaveBeenCalledWith({
//     //             id: 1,
//     //             username: 'testuser',
//     //             email: 'test@domain.com',
//     //             photo: '',
//     //             role: 'user',
//     //             coachId: null,
//     //         });
//     //     });
//     // });

// });
