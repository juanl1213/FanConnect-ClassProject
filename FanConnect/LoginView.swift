//
//  LoginView.swift
//  FanConnect
//
//  Created by user on 11/29/25.
//

import SwiftUI

struct LoginView: View {
    @Environment(\.dismiss) private var dismiss
    
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var showPassword: Bool = false
    @State private var isLoading: Bool = false
    @State private var errorMessage: String? = nil
    
    @FocusState private var focusedField: Field?
    
    var onLoginComplete: () -> Void
    var onSignUpTap: () -> Void
    
    enum Field {
        case email, password
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header Section
                headerSection
                
                // Form Section
                formSection
            }
        }
        .background(Color(.systemGroupedBackground))
        .ignoresSafeArea(edges: .top)
    }
    
    // MARK: - Header Section
    private var headerSection: some View {
        VStack(spacing: 20) {
            // Back Button
            HStack {
                Button(action: {
                    dismiss()
                }) {
                    Image(systemName: "xmark")
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(.white)
                        .frame(width: 36, height: 36)
                        .background(Color.white.opacity(0.2))
                        .clipShape(Circle())
                }
                
                Spacer()
            }
            .padding(.horizontal)
            .padding(.top, 20)
            
            // Logo and Title
            VStack(spacing: 12) {
                ZStack {
                    Circle()
                        .fill(Color.white)
                        .frame(width: 80, height: 80)
                    
                    Text("⚽")
                        .font(.system(size: 48))
                }
                
                Text("Welcome Back")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text("Log in to continue your journey")
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.9))
                    .multilineTextAlignment(.center)
            }
            .padding(.top, 20)
            .padding(.bottom, 20)
        }
        .frame(maxWidth: .infinity)
        .padding(.horizontal)
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, Color.purple]),
                startPoint: .leading,
                endPoint: .trailing
            )
        )
    }
    
    // MARK: - Form Section
    private var formSection: some View {
        VStack(spacing: 20) {
            // Error Message
            if let error = errorMessage {
                HStack {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundColor(.red)
                    Text(error)
                        .font(.subheadline)
                        .foregroundColor(.red)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(Color.red.opacity(0.1))
                .cornerRadius(12)
            }
            
            // Email Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Email")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.primary)
                
                TextField("Enter your email", text: $email)
                    .frame(height: 50)
                    .padding(.horizontal, 16)
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(focusedField == .email ? Color.blue : Color(.separator), lineWidth: 1)
                    )
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
                    .focused($focusedField, equals: .email)
                    .submitLabel(.next)
                    .onSubmit {
                        focusedField = .password
                    }
            }
            
            // Password Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Password")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.primary)
                
                HStack {
                    if showPassword {
                        TextField("Enter your password", text: $password)
                            .focused($focusedField, equals: .password)
                            .submitLabel(.go)
                            .onSubmit {
                                handleLogin()
                            }
                    } else {
                        SecureField("Enter your password", text: $password)
                            .focused($focusedField, equals: .password)
                            .submitLabel(.go)
                            .onSubmit {
                                handleLogin()
                            }
                    }
                    
                    Button(action: {
                        showPassword.toggle()
                    }) {
                        Image(systemName: showPassword ? "eye.slash.fill" : "eye.fill")
                            .foregroundColor(.secondary)
                    }
                }
                .frame(height: 50)
                .padding(.horizontal, 16)
                .background(Color(.systemBackground))
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(focusedField == .password ? Color.blue : Color(.separator), lineWidth: 1)
                )
            }
            
            // Forgot Password
            HStack {
                Spacer()
                Button(action: {
                    // Handle forgot password
                }) {
                    Text("Forgot Password?")
                        .font(.subheadline)
                        .foregroundColor(.blue)
                }
            }
            
            // Log In Button
            Button(action: handleLogin) {
                HStack {
                    if isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    } else {
                        Text("Log In")
                            .fontWeight(.semibold)
                    }
                }
                .frame(maxWidth: .infinity)
                .frame(height: 50)
                .foregroundColor(.white)
                .background(
                    isFormValid
                        ? LinearGradient(
                            gradient: Gradient(colors: [Color.blue, Color.purple]),
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                        : LinearGradient(
                            gradient: Gradient(colors: [Color.gray, Color.gray]),
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                )
                .cornerRadius(12)
            }
            .disabled(!isFormValid || isLoading)
            .padding(.top, 8)
            
            // Sign Up Link
            HStack {
                Text("Don't have an account?")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Button(action: onSignUpTap) {
                    Text("Sign Up")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(.blue)
                }
            }
            .padding(.top, 8)
            .padding(.bottom, 40)
        }
        .padding(24)
        .background(Color(.systemGroupedBackground))
    }
    
    // MARK: - Validation
    private var isFormValid: Bool {
        !email.isEmpty &&
        isValidEmail(email) &&
        !password.isEmpty
    }
    
    private func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPredicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return emailPredicate.evaluate(with: email)
    }
    
    // MARK: - Actions
    private func handleLogin() {
        guard isFormValid else { return }
        
        errorMessage = nil
        isLoading = true
        
        // Simulate API call
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            isLoading = false
            
            // Simulate login validation
            if password.count >= 6 {
                onLoginComplete()
            } else {
                errorMessage = "Invalid email or password. Please try again."
            }
        }
    }
}

// MARK: - Preview
struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView(
            onLoginComplete: {
                print("Login complete")
            },
            onSignUpTap: {
                print("Sign up tapped")
            }
        )
    }
}

