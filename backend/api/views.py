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
        return JsonResponse({'redirect': '/auth/'}, content_type='application/json')
    return redirect('auth')

def auth_view(request):
    if request.user.is_authenticated:
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'redirect': '/app/'}, content_type='application/json')
        return redirect('app')

    if request.method == 'POST':
        action = request.POST.get('action')
        is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

        if action == 'login':
            return handle_login(request, is_ajax)
        elif action == 'register':
            return handle_register(request, is_ajax)
        
        # Invalid action
        if is_ajax:
            return JsonResponse({'errors': ['Invalid action']}, status=400, content_type='application/json')
        messages.error(request, 'Invalid action')
        return render(request, 'auth.html')

    # GET request
    return render(request, 'auth.html')

def handle_login(request, is_ajax):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        if is_ajax:
            return JsonResponse({'redirect': '/app/'}, content_type='application/json')
        return redirect('app')
    else:
        error = "Invalid username or password"
        if is_ajax:
            return JsonResponse({'errors': [error]}, status=400, content_type='application/json')
        messages.error(request, error)
        return render(request, 'auth.html')

def handle_register(request, is_ajax):
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
        user = form.save()
        login(request, user)  # Directly login the user after creation
        if is_ajax:
            return JsonResponse({'redirect': '/app/'}, content_type='application/json')
        return redirect('app')
    
    # Form is invalid - collect all errors
    errors = []
    for field, field_errors in form.errors.items():
        # Remove field labels if you want cleaner messages
        for error in field_errors:
            errors.append(error)  # Just show the error without field name
    
    if is_ajax:
        return JsonResponse({'errors': errors}, status=400, content_type='application/json')
    
    for error in errors:
        messages.error(request, error)
    return render(request, 'auth.html')

@login_required
def app_view(request):
    return render(request, 'index.html')