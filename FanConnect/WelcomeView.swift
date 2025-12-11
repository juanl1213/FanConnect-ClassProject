//
//  WelcomeView.swift
//  FanConnect
//
//  Created by user on 11/29/25.
//

import SwiftUI

struct WelcomeView: View {
    @State private var showLogin: Bool = false
    @State private var showSignUp: Bool = false
    @State private var showMainApp: Bool = false
    
    var body: some View {
        ZStack {
            // Background Gradient
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, Color.purple]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()
            
            VStack(spacing: 0) {
                Spacer()
                
                // Logo and Branding
                VStack(spacing: 24) {
                    // Logo
                    ZStack {
                        Circle()
                            .fill(Color.white)
                            .frame(width: 120, height: 120)
                            .shadow(color: Color.black.opacity(0.2), radius: 20, x: 0, y: 10)
                        
                        Text("⚽")
                            .font(.system(size: 72))
                    }
                    
                    // App Name
                    Text("FanConnect")
                        .font(.system(size: 42, weight: .bold))
                        .foregroundColor(.white)
                    
                    // Tagline
                    Text("Connect with fans and never watch alone")
                        .font(.title3)
                        .foregroundColor(.white.opacity(0.9))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 40)
                }
                
                Spacer()
                
                // Action Buttons
                VStack(spacing: 16) {
                    // Sign Up Button
                    Button(action: {
                        showSignUp = true
                    }) {
                        Text("Sign Up")
                            .font(.headline)
                            .fontWeight(.semibold)
                            .foregroundColor(.blue)
                            .frame(maxWidth: .infinity)
                            .frame(height: 56)
                            .background(Color.white)
                            .cornerRadius(16)
                    }
                    
                    // Log In Button
                    Button(action: {
                        showLogin = true
                    }) {
                        Text("Log In")
                            .font(.headline)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 56)
                            .background(Color.white.opacity(0.2))
                            .overlay(
                                RoundedRectangle(cornerRadius: 16)
                                    .stroke(Color.white.opacity(0.5), lineWidth: 2)
                            )
                            .cornerRadius(16)
                    }
                    
                    // Demo Button
                    Button(action: {
                        showMainApp = true
                    }) {
                        HStack {
                            Image(systemName: "play.circle.fill")
                                .font(.system(size: 18))
                            Text("Try Demo Account")
                                .font(.headline)
                                .fontWeight(.semibold)
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 56)
                        .background(Color.white.opacity(0.15))
                        .overlay(
                            RoundedRectangle(cornerRadius: 16)
                                .stroke(Color.white.opacity(0.3), lineWidth: 1.5)
                        )
                        .cornerRadius(16)
                    }
                }
                .padding(.horizontal, 32)
                .padding(.bottom, 60)
            }
        }
        .fullScreenCover(isPresented: $showSignUp) {
            SignUpView(
                onSignUpComplete: {
                    showSignUp = false
                    showMainApp = true
                },
                onLoginTap: {
                    showSignUp = false
                    showLogin = true
                }
            )
        }
        .fullScreenCover(isPresented: $showLogin) {
            LoginView(
                onLoginComplete: {
                    showLogin = false
                    showMainApp = true
                },
                onSignUpTap: {
                    showLogin = false
                    showSignUp = true
                }
            )
        }
        .fullScreenCover(isPresented: $showMainApp) {
            ContentView()
        }
    }
}

// MARK: - Preview
struct WelcomeView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomeView()
    }
}


