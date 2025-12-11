//
//  ProfileVisibilityView.swift
//  FanConnect
//
//  Created by user on 12/1/25.
//

import SwiftUI

struct ProfileVisibilityView: View {
    enum Visibility: String, CaseIterable, Identifiable {
        case everyone = "Everyone"
        case friends = "Friends only"
        case privateProfile = "Only me"
        
        var id: String { rawValue }
        var description: String {
            switch self {
            case .everyone:
                return "Anyone on FanConnect can view your profile."
            case .friends:
                return "Only GoalBuddies you've connected with can view your profile."
            case .privateProfile:
                return "Your profile is hidden from others. Only you can see it."
            }
        }
    }
    
    @State private var selectedVisibility: Visibility = .everyone
    
    var onClose: () -> Void
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Who can see your profile?")) {
                    ForEach(Visibility.allCases) { option in
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(option.rawValue)
                                    .font(.body)
                                Text(option.description)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            if option == selectedVisibility {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundColor(.blue)
                            }
                        }
                        .contentShape(Rectangle())
                        .onTapGesture {
                            selectedVisibility = option
                        }
                    }
                }
                
                Section(footer: Text("You can change your visibility at any time. Changes may take a few minutes to apply across the app.")) {
                    EmptyView()
                }
            }
            .navigationBarTitle("Profile Visibility", displayMode: .inline)
            .navigationBarItems(
                leading: Button("Close") {
                    onClose()
                },
                trailing: Button("Save") {
                    // Save visibility preference
                    onClose()
                }
            )
        }
    }
}

struct ProfileVisibilityView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileVisibilityView(onClose: {})
    }
}



