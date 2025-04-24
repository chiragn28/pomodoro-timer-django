from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from .forms import CustomUserCreationForm
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required

@require_POST
def logout_view(request):
    logout(request)
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'redirect': '/auth/'})
    return redirect('auth')

def auth_view(request):
    if request.user.is_authenticated:
        return redirect('app')
    
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'login':
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({'redirect': '/app/'})
                return redirect('app')
            else:
                error = "Invalid username or password"
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({'errors': [error]}, status=400)
                messages.error(request, error)
                return render(request, 'auth.html')  # Make sure to return here
        
        elif action == 'register':
            form = CustomUserCreationForm(request.POST)
            if form.is_valid():
                user = form.save()
                # After registration, authenticate and login the user
                authenticated_user = authenticate(
                    username=form.cleaned_data['username'],
                    password=form.cleaned_data['password1']
                )
                if authenticated_user:
                    login(request, authenticated_user)
                    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                        return JsonResponse({'redirect': '/app/'})
                    return redirect('app')
            else:
                errors = []
                for field, field_errors in form.errors.items():
                    for error in field_errors:
                        errors.append(f"{field}: {error}")
                
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({'errors': errors}, status=400)
                for error in errors:
                    messages.error(request, error)
    
    return render(request, 'auth.html')

@login_required
def app_view(request):
    return render(request, 'index.html')