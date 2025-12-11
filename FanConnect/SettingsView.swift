import SwiftUI

struct SettingsView: View {
    @State private var pushNotificationsEnabled: Bool = true
    @State private var chatMessagesEnabled: Bool = true
    @State private var eventRemindersEnabled: Bool = true
    @State private var locationEnabled: Bool = true
    @State private var darkModeEnabled: Bool = false
    @State private var showEditProfile: Bool = false
    @State private var showChangePassword: Bool = false
    @State private var showEmailPreferences: Bool = false
    @State private var showProfileVisibility: Bool = false
    @State private var showBlockedUsers: Bool = false
    
    var onBack: () -> Void
    
    init(onBack: @escaping () -> Void) {
        self.onBack = onBack
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header
                headerSection
                
                // Settings Content
                settingsContentSection
            }
        }
        .background(Color(.systemGroupedBackground))
        .ignoresSafeArea(edges: .top)
        .sheet(isPresented: $showEditProfile) {
            EditProfileView(onClose: { showEditProfile = false })
        }
        .sheet(isPresented: $showChangePassword) {
            ChangePasswordView(onClose: { showChangePassword = false })
        }
        .sheet(isPresented: $showEmailPreferences) {
            EmailPreferencesView(onClose: { showEmailPreferences = false })
        }
        .sheet(isPresented: $showProfileVisibility) {
            ProfileVisibilityView(onClose: { showProfileVisibility = false })
        }
        .sheet(isPresented: $showBlockedUsers) {
            BlockedUsersView(onClose: { showBlockedUsers = false })
        }
    }
    
    // MARK: - Header Section
    private var headerSection: some View {
        VStack(spacing: 12) {
            // Push header down a bit from the very top
            Spacer()
                .frame(height: 32)
            
            HStack {
                Button(action: onBack) {
                    Image(systemName: "arrow.left")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                        .frame(width: 36, height: 36)
                        .background(Color.white.opacity(0.2))
                        .clipShape(Circle())
                }
                
                Spacer()
                
                Text("Settings")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Spacer()
                
                // Spacer to balance the back button
                Color.clear
                    .frame(width: 36, height: 36)
            }
            .padding(.horizontal)
            .padding(.bottom, 12)
        }
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color.blue, Color.purple]),
                startPoint: .leading,
                endPoint: .trailing
            )
        )
    }
    
    // MARK: - Settings Content Section
    private var settingsContentSection: some View {
        VStack(spacing: 24) {
            // Account Section
            settingsSection(title: "Account") {
                settingsRow(
                    icon: "person.fill",
                    iconColor: .blue,
                    title: "Edit Profile",
                    action: {
                        showEditProfile = true
                    }
                )
                
                settingsRow(
                    icon: "lock.fill",
                    iconColor: .red,
                    title: "Change Password",
                    action: {
                        showChangePassword = true
                    }
                )
                
                settingsRow(
                    icon: "envelope.fill",
                    iconColor: .orange,
                    title: "Email Preferences",
                    action: {
                        showEmailPreferences = true
                    }
                )
            }
            
            // Notifications Section
            settingsSection(title: "Notifications") {
                toggleRow(
                    icon: "bell.fill",
                    iconColor: .blue,
                    title: "Push Notifications",
                    isOn: $pushNotificationsEnabled
                )
                
                toggleRow(
                    icon: "message.fill",
                    iconColor: .green,
                    title: "Chat Messages",
                    isOn: $chatMessagesEnabled
                )
                
                toggleRow(
                    icon: "calendar",
                    iconColor: .purple,
                    title: "Event Reminders",
                    isOn: $eventRemindersEnabled
                )
            }
            
            // Privacy Section
            settingsSection(title: "Privacy") {
                toggleRow(
                    icon: "location.fill",
                    iconColor: .red,
                    title: "Location Services",
                    isOn: $locationEnabled
                )
                
                settingsRow(
                    icon: "eye.fill",
                    iconColor: .blue,
                    title: "Profile Visibility",
                    action: {
                        showProfileVisibility = true
                    }
                )
                
                settingsRow(
                    icon: "hand.raised.fill",
                    iconColor: .orange,
                    title: "Blocked Users",
                    action: {
                        showBlockedUsers = true
                    }
                )
            }
            
            // App Settings Section
            settingsSection(title: "App Settings") {
                toggleRow(
                    icon: "moon.fill",
                    iconColor: .indigo,
                    title: "Dark Mode",
                    isOn: $darkModeEnabled
                )
                
                settingsRow(
                    icon: "globe",
                    iconColor: .blue,
                    title: "Language",
                    value: "English",
                    action: {
                        // Language selection action
                    }
                )
                
                settingsRow(
                    icon: "info.circle.fill",
                    iconColor: .gray,
                    title: "App Version",
                    value: "1.0.0",
                    action: nil
                )
            }
            
            // Support Section
            settingsSection(title: "Support") {
                settingsRow(
                    icon: "questionmark.circle.fill",
                    iconColor: .blue,
                    title: "Help Center",
                    action: {
                        // Help center action
                    }
                )
                
                settingsRow(
                    icon: "doc.text.fill",
                    iconColor: .gray,
                    title: "Terms of Service",
                    action: {
                        // Terms of service action
                    }
                )
                
                settingsRow(
                    icon: "lock.shield.fill",
                    iconColor: .gray,
                    title: "Privacy Policy",
                    action: {
                        // Privacy policy action
                    }
                )
                
                settingsRow(
                    icon: "envelope.fill",
                    iconColor: .blue,
                    title: "Contact Us",
                    action: {
                        // Contact us action
                    }
                )
            }
            
            // Danger Zone
            settingsSection(title: "Account Actions") {
                settingsRow(
                    icon: "arrow.right.square.fill",
                    iconColor: .orange,
                    title: "Sign Out",
                    titleColor: .orange,
                    action: {
                        // Sign out action
                    }
                )
                
                settingsRow(
                    icon: "trash.fill",
                    iconColor: .red,
                    title: "Delete Account",
                    titleColor: .red,
                    action: {
                        // Delete account action
                    }
                )
            }
            
            // Spacing at bottom
            Color.clear
                .frame(height: 20)
        }
        .padding()
    }
    
    // MARK: - Settings Section
    private func settingsSection<Content: View>(title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.headline)
                .foregroundColor(.secondary)
                .padding(.horizontal, 4)
            
            VStack(spacing: 0) {
                content()
            }
            .background(Color(.systemBackground))
            .cornerRadius(16)
        }
    }
    
    // MARK: - Settings Row
    private func settingsRow(
        icon: String,
        iconColor: Color,
        title: String,
        value: String? = nil,
        titleColor: Color = .primary,
        action: (() -> Void)?
    ) -> some View {
        Button(action: {
            action?()
        }) {
            HStack(spacing: 12) {
                // Icon
                ZStack {
                    RoundedRectangle(cornerRadius: 8)
                        .fill(iconColor.opacity(0.15))
                        .frame(width: 36, height: 36)
                    
                    Image(systemName: icon)
                        .font(.system(size: 16))
                        .foregroundColor(iconColor)
                }
                
                // Title
                Text(title)
                    .font(.body)
                    .foregroundColor(titleColor)
                
                Spacer()
                
                // Value or Chevron
                if let value = value {
                    Text(value)
                        .font(.body)
                        .foregroundColor(.secondary)
                } else if action != nil {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.secondary)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
        }
        .buttonStyle(PlainButtonStyle())
        .disabled(action == nil)
    }
    
    // MARK: - Toggle Row
    private func toggleRow(
        icon: String,
        iconColor: Color,
        title: String,
        isOn: Binding<Bool>
    ) -> some View {
        HStack(spacing: 12) {
            // Icon
            ZStack {
                RoundedRectangle(cornerRadius: 8)
                    .fill(iconColor.opacity(0.15))
                    .frame(width: 36, height: 36)
                
                Image(systemName: icon)
                    .font(.system(size: 16))
                    .foregroundColor(iconColor)
            }
            
            // Title
            Text(title)
                .font(.body)
                .foregroundColor(.primary)
            
            Spacer()
            
            // Toggle
            Toggle("", isOn: isOn)
                .labelsHidden()
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }
}

// MARK: - Preview
struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView(onBack: {
            print("Back tapped")
        })
    }
}


