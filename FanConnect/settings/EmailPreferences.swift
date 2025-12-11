//
//  EmailPreferences.swift
//  FanConnect
//
//  Created by user on 12/1/25.
//

import SwiftUI

struct EmailPreferencesView: View {
    @State private var eventUpdates: Bool = true
    @State private var chatSummaries: Bool = true
    @State private var promotions: Bool = false
    
    var onClose: () -> Void
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Email Notifications")) {
                    Toggle("Event updates", isOn: $eventUpdates)
                    Toggle("Chat summaries", isOn: $chatSummaries)
                    Toggle("Promotions and offers", isOn: $promotions)
                }
                
                Section(footer: Text("You can change these preferences at any time.")) {
                    EmptyView()
                }
            }
            .navigationBarTitle("Email Preferences", displayMode: .inline)
            .navigationBarItems(
                leading: Button("Close") {
                    onClose()
                },
                trailing: Button("Save") {
                    // Save email preferences
                    onClose()
                }
            )
        }
    }
}

struct EmailPreferencesView_Previews: PreviewProvider {
    static var previews: some View {
        EmailPreferencesView(onClose: {})
    }
}



