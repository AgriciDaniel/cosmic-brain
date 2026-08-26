// Minimal MediatR-compatible interfaces/types used by docs/PartC-MC.cs snippets.
// These let the MediatR "Before" snippets compile without pulling in the MediatR package.
// They mirror MediatR's public surface closely enough to make the examples compile.

// ReSharper disable once CheckNamespace
namespace MediatR;

public interface IRequest<out TResponse>;

public interface IRequestHandler<in TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}

public delegate Task<TResponse> RequestHandlerDelegate<TResponse>();

public interface IPipelineBehavior<in TRequest, TResponse>
{
    Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken);
}

public interface INotification;

public interface INotificationHandler<in TNotification>
    where TNotification : INotification
{
    Task Handle(TNotification notification, CancellationToken cancellationToken);
}

public class MediatRServiceConfiguration
{
    public MediatRServiceConfiguration RegisterServicesFromAssembly(System.Reflection.Assembly assembly) => this;
}

public static class MediatRServiceCollectionExtensions
{
    public static IServiceCollection AddMediatR(this IServiceCollection services, Action<MediatRServiceConfiguration> configure)
    {
        configure(new MediatRServiceConfiguration());
        return services;
    }
}
