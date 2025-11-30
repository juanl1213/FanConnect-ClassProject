//
//  SignUpView.swift
//  FanConnect
//
//  Created by user on 11/29/25.
//
import SwiftUI

struct SignUpView: View {
    @State private var fullName: String = ""
    @State private var username: String = ""
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var confirmPassword: String = ""
    @State private var favoriteTeam: String = ""
    @State private var agreeToTerms: Bool = false
    @State private var showPassword: Bool = false
    @State private var showConfirmPassword: Bool = false
    @State private var isLoading: Bool = false
    
    @FocusState private var focusedField: Field?
    
    var onSignUpComplete: () -> Void
    var onLoginTap: () -> Void
    
    enum Field {
        case fullName, username, email, password, confirmPassword, favoriteTeam
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
        VStack(spacing: 4) {
            // Logo and Title
            VStack(spacing: 20) {
                ZStack {
                    Circle()
                        .fill(Color.white)
                        .frame(width: 80, height: 80)
                    
                    Text("⚽")
                        .font(.system(size: 48))
                }
                
                Text("Join GoalGather")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text("Connect with fans and never watch alone")
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.9))
                    .multilineTextAlignment(.center)
            }
            .padding(.top, 40)
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
            // Full Name Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Full Name")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.primary)
                
                TextField("Enter your full name", text: $fullName)
                    .frame(height: 50)
                    .padding(.horizontal, 16)
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(focusedField == .fullName ? Color.blue : Color(.separator), lineWidth: 1)
                    )
                    .focused($focusedField, equals: .fullName)
                    .submitLabel(.next)
                    .onSubmit {
                        focusedField = .username
                    }
            }
            
            // Username Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Username")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.primary)
                
                HStack {
                    Text("@")
                        .foregroundColor(.secondary)
                        .padding(.leading, 16)
                    
                    TextField("username", text: $username)
                        .textFieldStyle(PlainTextFieldStyle())
                        .focused($focusedField, equals: .username)
                        .submitLabel(.next)
                        .onSubmit {
                            focusedField = .email
                        }
                }
                .frame(height: 50)
                .background(Color(.systemBackground))
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(focusedField == .username ? Color.blue : Color(.separator), lineWidth: 1)
                )
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
                            .submitLabel(.next)
                            .onSubmit {
                                focusedField = .confirmPassword
                            }
                    } else {
                        SecureField("Enter your password", text: $password)
                            .focused($focusedField, equals: .password)
                            .submitLabel(.next)
                            .onSubmit {
                                focusedField = .confirmPassword
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
            
            // Confirm Password Field
            VStack(alignment: .leading, spacing: 8) {
                Text("Confirm Password")
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(.primary)
                
                HStack {
                    if showConfirmPassword {
                        TextField("Confirm your password", text: $confirmPassword)
                            .focused($focusedField, equals: .confirmPassword)
                            .submitLabel(.next)
                            .onSubmit {
                                focusedField = .favoriteTeam
                            }
                    } else {
                        SecureField("Confirm your password", text: $confirmPassword)
                            .focused($focusedField, equals: .confirmPassword)
                            .submitLabel(.next)
                            .onSubmit {
                                focusedField = .favoriteTeam
                            }
                    }
                    
                    Button(action: {
                        showConfirmPassword.toggle()
                    }) {
                        Image(systemName: showConfirmPassword ? "eye.slash.fill" : "eye.fill")
                            .foregroundColor(.secondary)
                    }
                }
                .frame(height: 50)
                .padding(.horizontal, 16)
                .background(Color(.systemBackground))
                .cornerRadius(12)
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(focusedField == .confirmPassword ? Color.blue : Color(.separator), lineWidth: 1)
                )
            }
            
            // Favorite Team Field (Optional)
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("Favorite Team")
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundColor(.primary)
                    
                    Text("(Optional)")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                TextField("e.g., Manchester United", text: $favoriteTeam)
                    .frame(height: 50)
                    .padding(.horizontal, 16)
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(focusedField == .favoriteTeam ? Color.blue : Color(.separator), lineWidth: 1)
                    )
                    .focused($focusedField, equals: .favoriteTeam)
                    .submitLabel(.done)
                    .onSubmit {
                        focusedField = nil
                    }
            }
            
            // Terms and Conditions
            HStack(alignment: .top, spacing: 12) {
                Button(action: {
                    agreeToTerms.toggle()
                }) {
                    Image(systemName: agreeToTerms ? "checkmark.square.fill" : "square")
                        .foregroundColor(agreeToTerms ? .blue : .secondary)
                        .font(.system(size: 20))
                }
                
                Text("I agree to the Terms of Service and Privacy Policy")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .padding(.vertical, 8)
            
            // Sign Up Button
            Button(action: handleSignUp) {
                HStack {
                    if isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    } else {
                        Text("Sign Up")
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
            
            // Login Link
            HStack {
                Text("Already have an account?")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Button(action: onLoginTap) {
                    Text("Log In")
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
        !fullName.isEmpty &&
        !username.isEmpty &&
        !email.isEmpty &&
        isValidEmail(email) &&
        !password.isEmpty &&
        password.count >= 8 &&
        password == confirmPassword &&
        agreeToTerms
    }
    
    private func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPredicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return emailPredicate.evaluate(with: email)
    }
    
    // MARK: - Actions
    private func handleSignUp() {
        guard isFormValid else { return }
        
        isLoading = true
        
        // Simulate API call
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            isLoading = false
            onSignUpComplete()
        }
    }
}


// MARK: - Preview
struct SignUpView_Previews: PreviewProvider {
    static var previews: some View {
        SignUpView(
            onSignUpComplete: {
                print("Sign up complete")
            },
            onLoginTap: {
                print("Login tapped")
            }
        )
    }
}


